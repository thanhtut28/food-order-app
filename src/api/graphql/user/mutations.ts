import { User } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { ErrorMessage } from "../../../constants/message";
import { db } from "../../../utils/db";
import errorHandler from "../../../utils/error-handler";
import signInValidator from "../../../validator/sign-in";
import signUpValidator from "../../../validator/sign-up";
import { builder } from "../../builder";
import { SignInUserInput, SignUpUserInput } from "./schema";
import { handleSignUpError, validateSignInSchema, validateSignUpSchema } from "./utils";

builder.mutationFields(t => ({
   signUp: t.prismaField({
      type: "User",
      args: {
         input: t.arg({
            type: SignUpUserInput,
            required: true,
         }),
      },
      resolve: async (_query, _root, { input: { email, password, username } }, _ctx) => {
         const schemaData = signUpValidator(email, username, password);

         validateSignUpSchema(schemaData);

         const hashedPassword = await hash(password, 12);

         const user = (await db.user
            .create({
               data: { email, password: hashedPassword, username },
            })
            .catch(e => {
               handleSignUpError(e);
            })) as User;
         return user;
      },
   }),

   signIn: t.prismaField({
      type: "User",
      nullable: true,
      args: {
         input: t.arg({
            type: SignInUserInput,
            required: true,
         }),
      },

      resolve: async (_query, _root, { input: { email, password } }, _ctx) => {
         const schemaData = signInValidator(email, password);

         validateSignInSchema(schemaData);

         const user = (await db.user
            .findUniqueOrThrow({
               where: {
                  email,
               },
            })
            .catch(() => {
               errorHandler.throwDbError({ message: ErrorMessage.USER_NOT_FOUND });
            })) as User;

         const validatePassword = await compare(password, user.password);

         if (!validatePassword) {
            errorHandler.throwDbError({ message: ErrorMessage.PASSWORD_DOES_NOT_MATCH });
         }

         return user;
      },
   }),
}));
