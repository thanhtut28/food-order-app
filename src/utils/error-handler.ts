import { ApolloError, UserInputError } from "apollo-server-express";
import { ErrorMessage } from "../constants/message";

interface ErrorArgs {
   field?: string;
   message: string;
}

export class ErrorHandler {
   throwBaseError(): never {
      throw new Error(ErrorMessage.DEFAULT_ERROR);
   }

   throwInputError({ field, message }: ErrorArgs): never {
      throw new UserInputError(message, {
         field,
      });
   }

   throwDbError({ message }: ErrorArgs): never {
      throw new ApolloError(`DB_ERROR: ${message}`);
   }
}

const errorHandler = new ErrorHandler();
export default errorHandler;
