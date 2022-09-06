import { Prisma } from "@prisma/client";
import { ErrorMessage } from "../../../constants/message";
import { PRISMA_STATUS_CODES } from "../../../constants/status-code";
import errorHandler from "../../../utils/error-handler";
import { SignInSchemaData } from "../../../validator/sign-in";
import { SignUpSchemaData } from "../../../validator/sign-up";

export function handleSignUpError(e: any) {
   if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === PRISMA_STATUS_CODES.UNIQUE_CONSTRAINT) {
         if ((e as any).meta.target[0] === "username") {
            errorHandler.throwDbError({
               message: ErrorMessage.USERNAME_ALREADY_CREATED,
            });
         } else if ((e as any).meta.target[0] === "email") {
            errorHandler.throwDbError({
               message: ErrorMessage.EMAIL_ALREADY_CREATED,
            });
         }
      }
   }
   errorHandler.throwBaseError();
}

export function validateSignUpSchema(schemaData: SignUpSchemaData) {
   if (!schemaData.success) {
      const errorMessage = schemaData.error.issues[0].message;
      errorHandler.throwInputError({
         field: schemaData.error.issues[0].path[0] as string,
         message: errorMessage,
      });
   }
}

export function validateSignInSchema(schemaData: SignInSchemaData) {
   if (!schemaData.success) {
      const errorMessage = schemaData.error.issues[0].message;
      errorHandler.throwInputError({
         field: schemaData.error.issues[0].path[0] as string,
         message: errorMessage,
      });
   }
}
