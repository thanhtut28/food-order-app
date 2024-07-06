import { ApolloError, AuthenticationError, UserInputError } from "apollo-server-express";
import { ErrorMessage } from "../constants/message";

interface ErrorArgs {
   field?: string;
   message: string;
}

/**
 * Represents an ErrorHandler class which catches and throws multiple types of errors.
 * @class
 */
class ErrorHandler {
   /**
    * Throws an authentication error.
    * @throws {AuthenticationError} Throws an error indicating the user is not authenticated.
    */
   throwAuthError(): never {
      throw new AuthenticationError(ErrorMessage.NOT_AUTHENTICATED);
   }

   /**
    * Throws a base error.
    * @throws {Error} Throws a default error.
    */
   throwBaseError(): never {
      throw new Error(ErrorMessage.DEFAULT_ERROR);
   }

   /**
    * Throws a user input error.
    * @param {Object} args - The arguments for the error.
    * @param {string} args.field - The field that caused the error.
    * @param {string} args.message - The error message.
    * @throws {UserInputError} Throws an error for invalid user input.
    */
   throwInputError({ field, message }: ErrorArgs): never {
      throw new UserInputError(message, { field });
   }

   /**
    * Throws a database error.
    * @param {Object} args - The arguments for the error.
    * @param {string} args.message - The error message.
    * @throws {ApolloError} Throws an error indicating a database error.
    */
   throwDbError({ message }: ErrorArgs): never {
      throw new ApolloError(`DB_ERROR: ${message}`);
   }

   /**
    * Throws a generic error with a custom message.
    * @param {Object} args - The arguments for the error.
    * @param {string} args.message - The error message.
    * @throws {Error} Throws a generic error with the provided message.
    */
   throwError({ message }: ErrorArgs): never {
      throw new Error(message);
   }
}

const errorHandler = new ErrorHandler();
export default errorHandler;
