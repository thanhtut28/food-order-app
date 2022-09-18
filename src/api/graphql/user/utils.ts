import { ValuesFromEnum } from "@pothos/core";
import { Prisma } from "@prisma/client";
import { Field } from "../../../constants/enum";
import { ErrorMessage } from "../../../constants/message";
import { PRISMA_STATUS_CODES } from "../../../constants/status-code";
import errorHandler from "../../../utils/error-handler";

export function handleSignUpError(e: any) {
   if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === PRISMA_STATUS_CODES.UNIQUE_CONSTRAINT) {
         if ((e as any).meta.target[0] === Field.USERNAME) {
            return {
               field: Field.USERNAME,
               message: ErrorMessage.USERNAME_ALREADY_CREATED,
            };
         } else if ((e as any).meta.target[0] === Field.EMAIL) {
            return {
               field: Field.EMAIL,
               message: ErrorMessage.EMAIL_ALREADY_CREATED,
            };
         }
      }
   }
   if (e instanceof Prisma.PrismaClientInitializationError) {
      errorHandler.throwBaseError();
   }

   return null;
}

export function validateSchema(schemaData: any) {
   if (!schemaData.success) {
      const errorMessage = schemaData.error.issues[0].message;
      return {
         field: schemaData.error.issues[0].path[0] as ValuesFromEnum<typeof Field>,
         message: errorMessage,
      };
   }

   return null;
}
