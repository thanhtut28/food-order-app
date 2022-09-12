import { User } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { Field } from "../../../constants/enum";
import { ErrorMessage } from "../../../constants/message";
import { db } from "../../../utils/db";
import errorHandler from "../../../utils/error-handler";
import signUpValidator from "../../../validator/sign-up";
import { builder } from "../../builder";
import {
   AuthenticationResponse,
   ChangePasswordInput,
   ChangePasswordResponse,
   SignInUserInput,
   SignUpUserInput,
} from "./schema";
import { handleSignUpError, validateSchema } from "./utils";
import { v4 } from "uuid";
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../../../constants/config";
import { sendEmail } from "../../../utils/sendEmail";
import changePasswordValidator from "../../../validator/change-password";
import updateUsernameValidator from "../../../validator/update-username";

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
            const error = handleSignUpError(err);
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
      },
   }),

   forgotPassword: t.field({
      type: "Boolean",
      args: {
         email: t.arg({ type: "String", required: true }),
      },
      resolve: async (_root, { email }, { redis }) => {
         const user = await db.user.findUnique({ where: { email } });
         if (!user) {
            return false;
         }

         const token = v4();

         await redis.set(FORGOT_PASSWORD_PREFIX + token, user.id, "EX", 1000 * 60 * 10);

         await sendEmail(
            email,
            `<a href="http://localhost:3000/change-password/${token}">change-password</a>`
         ).catch(() => {
            errorHandler.throwError({ message: `Fail to send email. Try again later` });
         });

         return true;
      },
   }),

   changePassword: t.field({
      type: ChangePasswordResponse,
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
      type: AuthenticationResponse,
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
            return {
               user: null,
               error,
            };
         }

         const user = await db.user.findUnique({ where: { id: req.session.userId } });

         if (!user) {
            errorHandler.throwDbError({ message: ErrorMessage.USER_NOT_EXIST });
         }

         let newUser: User | undefined;
         try {
            newUser = await db.user.update({
               where: { id: req.session.userId },
               data: { username },
            });
         } catch (_e) {
            errorHandler.throwDbError({ message: ErrorMessage.CANNOT_UPDATE_USERNAME });
         }

         return {
            user: newUser,
            error: null,
         };
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
