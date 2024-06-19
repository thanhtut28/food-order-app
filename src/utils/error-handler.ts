import { ApolloError, AuthenticationError, UserInputError } from "apollo-server-express";
import { ErrorMessage } from "../constants/message";

interface ErrorArgs {
   field?: string;
   message: string;
}

/**
 * Represents Error class which catches multiple errors
 * @class
 * @method throwBaseError
 * catch default Error
 *
 */
class ErrorHandler {
   throwAuthError(): never {
      throw new AuthenticationError(ErrorMessage.NOT_AUTHENTICATED);
   }

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

   throwError({ message }: ErrorArgs): never {
      throw new Error(message);
   }
}

const errorHandler = new ErrorHandler();
export default errorHandler;
