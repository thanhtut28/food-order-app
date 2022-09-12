import { z, SafeParseReturnType } from "zod";
import { passwordSchema } from "./schema";

interface SignInInput {
   password: string;
}

export default function changePasswordValidator(password: string) {
   const changePasswordInput = z.object({
      password: passwordSchema,
   });

   return changePasswordInput.safeParse({ password });
}
