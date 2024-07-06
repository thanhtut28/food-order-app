import { ValuesFromEnum } from "@pothos/core";
import { Prisma } from "@prisma/client";
import { Field } from "../../../constants/enum";
import { ErrorMessage } from "../../../constants/message";
import { PRISMA_STATUS_CODES } from "../../../constants/status-code";
import errorHandler from "../../../utils/error-handler";

interface AuthError {
   field: ValuesFromEnum<typeof Field>;
   message: string;
}

interface SchemaError {
   field: ValuesFromEnum<typeof Field>;
   message: string;
}

/**
 * Handles authentication errors.
 * @param {any} e - The error to handle.
 * @returns {AuthError|null} An object containing the field and error message, or null if no specific error is handled.
 */
export function handleAuthError(e: any): AuthError | null {
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

/**
 * Validates a schema.
 * @param {any} schemaData - The data to validate.
 * @returns {SchemaError|null} An object containing the field and error message, or null if the schema is valid.
 */
export function validateSchema(schemaData: any): SchemaError | null {
   if (!schemaData.success) {
      const errorMessage = schemaData.error.issues[0].message;
      return {
         field: schemaData.error.issues[0].path[0] as ValuesFromEnum<typeof Field>,
         message: errorMessage,
      };
   }

   return null;
}
