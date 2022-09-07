import { z, SafeParseReturnType } from "zod";
import { emailSchema, usernameSchema, passwordSchema } from "./schema";

interface SignUpInput {
   email: string;
   username: string;
   password: string;
}

export type SignUpSchemaData = SafeParseReturnType<SignUpInput, SignUpInput>;

export default function signUpValidator(email: string, username: string, password: string) {
   const SignUpInput = z.object({
      email: emailSchema,
      username: usernameSchema,
      password: passwordSchema,
   });

   return SignUpInput.safeParse({ email, username, password });
}
