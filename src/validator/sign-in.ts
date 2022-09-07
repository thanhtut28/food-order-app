import { z, SafeParseReturnType } from "zod";
import { emailSchema, passwordSchema } from "./schema";

interface SignInInput {
   email: string;
   password: string;
}

export type SignInSchemaData = SafeParseReturnType<SignInInput, SignInInput>;

export default function signInValidator(email: string, password: string): SignInSchemaData {
   const SignUpInput = z.object({
      email: emailSchema,
      password: passwordSchema,
   });

   return SignUpInput.safeParse({ email, password });
}
