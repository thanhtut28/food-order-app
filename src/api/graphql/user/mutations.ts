import { User } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { v4 } from "uuid";
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../../../constants/config";
import { Field } from "../../../constants/enum";
import { ErrorMessage } from "../../../constants/message";
import { db } from "../../../utils/db";
import errorHandler from "../../../utils/error-handler";
import { sendEmail } from "../../../utils/sendEmail";
import changePasswordValidator from "../../../validator/change-password";
import signUpValidator from "../../../validator/sign-up";
import updateAddressValidator from "../../../validator/update-address";
import updateEmailValidator from "../../../validator/update-email";
import updateUsernameValidator from "../../../validator/update-username";
import { builder } from "../../builder";
import {
   AuthenticationResponse,
   ChangePasswordInput,
   ChangePasswordResponse,
   SignInUserInput,
   SignUpUserInput,
} from "./schema";
import { handleAuthError, validateSchema } from "./utils";
import signInValidator from "../../../validator/sign-in";

builder.mutationFields(t => ({
   signUp: t.field({
      type: AuthenticationResponse,
      skipTypeScopes: true,
      args: {
         input: t.arg({
            type: SignUpUserInput,
            required: true,
         }),
      },
      resolve: async (_root, { input: { email, password, username } }, { req }) => {
         const schemaData = signUpValidator(email, username, password);

         const error = validateSchema(schemaData);

         if (error) {
            return { error, user: null };
         }

         const hashedPassword = await hash(password, 12);

         let user: User | undefined;
         try {
            user = await db.user.create({
               data: { email, password: hashedPassword, username },
            });
         } catch (err) {
            const error = handleAuthError(err);
            if (error) {
               return { error, user: null };
            }
            errorHandler.throwBaseError();
         }

         req.session.userId = user?.id;

         return { user, error: null };
      },
   }),

   signIn: t.field({
      type: AuthenticationResponse,
      skipTypeScopes: true,
      nullable: true,
      args: {
         input: t.arg({
            type: SignInUserInput,
            required: true,
         }),
      },

      resolve: async (_root, { input: { email, password } }, { req }) => {
         const schemaData = signInValidator(email);

         const error = validateSchema(schemaData);

         if (error) {
            return { error, user: null };
         }

         try {
            const user = await db.user.findUnique({
               where: {
                  email,
               },
            });

            if (!user) {
               return {
                  user: null,
                  error: {
                     field: Field.EMAIL,
                     message: ErrorMessage.USER_NOT_FOUND,
                  },
               };
            }

            const validatePassword = await compare(password, user.password);

            if (!validatePassword) {
               return {
                  user: null,
                  error: {
                     field: Field.PASSWORD,
                     message: ErrorMessage.INCORRECT_PASSWORD,
                  },
               };
            }

            req.session.userId = user.id;

            return { user, error: null };
         } catch (e) {
            // DB connection error
            errorHandler.throwBaseError();
         }
      },
   }),

   forgotPassword: t.field({
      type: ChangePasswordResponse,
      skipTypeScopes: true,
      args: {
         email: t.arg({ type: "String", required: true }),
      },
      resolve: async (_root, { email }, { redis }) => {
         const user = await db.user.findUnique({ where: { email } });
         if (!user) {
            return {
               success: false,
               error: {
                  field: Field.EMAIL,
                  message: ErrorMessage.USER_NOT_FOUND,
               },
            };
         }

         const token = v4();

         await redis.set(FORGOT_PASSWORD_PREFIX + token, user.id, "EX", 1000 * 60 * 10);

         await sendEmail(
            email,
            `<a href="http://localhost:3000/account/change-password/${token}">Click here to change your password.</a>`
         ).catch(() => {
            errorHandler.throwError({ message: `Fail to send email. Try again later` });
         });

         return {
            success: true,
            error: null,
         };
      },
   }),

   changePassword: t.field({
      type: ChangePasswordResponse,
      skipTypeScopes: true,
      args: {
         input: t.arg({
            type: ChangePasswordInput,
            required: true,
         }),
      },
      resolve: async (_root, { input: { token, newPassword } }, { redis, req }) => {
         const schemaData = changePasswordValidator(newPassword);

         const error = validateSchema(schemaData);
         if (error) {
            return { success: false, error };
         }

         const KEY = FORGOT_PASSWORD_PREFIX + token;

         const userId = await redis.get(KEY);
         if (!userId) {
            return {
               success: false,
               error: {
                  field: Field.TOKEN,
                  message: ErrorMessage.TOKEN_EXPIRED,
               },
            };
         }

         const userIdNum = parseInt(userId);

         const user = await db.user.findUnique({ where: { id: userIdNum } });
         if (!user) {
            return {
               success: false,
               error: {
                  field: Field.TOKEN,
                  message: ErrorMessage.USER_NOT_EXIST,
               },
            };
         }

         const isSamePassword = await compare(newPassword, user.password);
         if (isSamePassword) {
            return {
               success: true,
               error: {
                  field: Field.PASSWORD,
                  message: ErrorMessage.SAME_PASSWORD,
               },
            };
         }

         const hashedPassword = await hash(newPassword, 12);

         await db.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
         });

         await redis.del(KEY);

         req.session.userId = user.id;

         return {
            success: true,
            error: null,
         };
      },
   }),

   updateUsername: t.field({
      type: "Boolean",
      args: {
         username: t.arg({
            type: "String",
            required: true,
         }),
      },
      resolve: async (_root, { username }, { req }) => {
         const schemaData = updateUsernameValidator(username);

         const error = validateSchema(schemaData);

         if (error) {
            errorHandler.throwInputError({ ...error });
            return false;
         }

         // try {
         //    const user = await db.user.findUnique({ where: { id: req.session.userId } });

         //    if (!user) {
         //       errorHandler.throwDbError({ message: ErrorMessage.USER_NOT_EXIST });
         //       return false;
         //    }
         // } catch (e) {
         //    if (e instanceof Prisma.PrismaClientInitializationError) {
         //       errorHandler.throwBaseError();
         //    }
         //    throw e;
         // }

         await db.user
            .update({
               where: { id: req.session.userId },
               data: { username },
            })
            .catch((e: unknown) => {
               //* To catch again error for unique constraints
               const err = handleAuthError(e);
               if (err) {
                  errorHandler.throwInputError({ ...err });
               }
               errorHandler.throwDbError({ message: ErrorMessage.CANNOT_UPDATE_USERNAME });
            });
         return true;
      },
   }),

   updateEmail: t.field({
      type: "Boolean",
      args: {
         email: t.arg({
            type: "String",
            required: true,
         }),
      },
      resolve: async (_root, { email }, { req }) => {
         const schemaData = updateEmailValidator(email);

         const error = validateSchema(schemaData);

         if (error) {
            errorHandler.throwInputError({ ...error });
            return false;
         }

         // try {
         //    const user = await db.user.findUnique({ where: { id: req.session.userId } });
         //    if (!user) {
         //       errorHandler.throwDbError({ message: ErrorMessage.USER_NOT_EXIST });
         //       return false;
         //    }
         // } catch (e) {
         //    if (e instanceof Prisma.PrismaClientInitializationError) {
         //       errorHandler.throwBaseError();
         //    }
         //    throw e;
         // }

         await db.user
            .update({
               where: { id: req.session.userId },
               data: { email },
            })
            .catch((e: unknown) => {
               console.log(e);
               const err = handleAuthError(e);
               if (err) {
                  //* To catch again error for unique constraints
                  errorHandler.throwInputError({ ...err });
               }
               errorHandler.throwDbError({ message: ErrorMessage.CANNOT_UPDATE_EMAIL });
            });

         return true;
      },
   }),

   updateAddress: t.field({
      type: "Boolean",
      args: {
         address: t.arg({
            type: "String",
            required: true,
         }),
      },
      resolve: async (_root, { address }, { req }) => {
         const schemaData = updateAddressValidator(address);

         const error = validateSchema(schemaData);
         console.log(error);
         if (error) {
            //*
            errorHandler.throwInputError({ ...error });
            return false;
         }

         await db.user
            .update({
               where: { id: req.session.userId },
               data: { address },
            })
            .catch((e: unknown) => {
               errorHandler.throwDbError({
                  message: ErrorMessage.CANNOT_UPDATE_ADDRESS,
               });
            });

         return true;
      },
   }),

   logout: t.field({
      type: "Boolean",
      resolve: (_root, {}, { req, res }) => {
         return new Promise((resolve: (value: boolean) => void) => {
            req.session.destroy(err => {
               res.clearCookie(COOKIE_NAME);
               if (err) {
                  errorHandler.throwBaseError();
                  resolve(false);
               }
               resolve(true);
            });
         });
      },
   }),
}));
