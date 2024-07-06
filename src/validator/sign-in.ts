import { z, SafeParseReturnType } from "zod";
import { emailSchema } from "./schema";

interface SignInInput {
   email: string;
}

export type SignInSchemaData = SafeParseReturnType<SignInInput, SignInInput>;

export default function signInValidator(email: string): SignInSchemaData {
   const SignInInput = z.object({
      email: emailSchema,
   });

   return SignInInput.safeParse({ email });
}
