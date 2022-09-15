import { z } from "zod";
import { emailSchema } from "./schema";

export default function updateEmailValidator(email: string) {
   const changePasswordInput = z.object({
      email: emailSchema,
   });

   return changePasswordInput.safeParse({ email });
}
