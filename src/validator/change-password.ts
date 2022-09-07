import { z, SafeParseReturnType } from "zod";
import { passwordSchema } from "./schema";

interface SignInInput {
   password: string;
}

export type SignInSchemaData = SafeParseReturnType<SignInInput, SignInInput>;

export default function changePasswordValidator(password: string): SignInSchemaData {
   const changePasswordInput = z.object({
      password: passwordSchema,
   });

   return changePasswordInput.safeParse({ password });
}
