import { z } from "zod";
import { usernameSchema } from "./schema";

export default function updateUsernameValidator(username: string) {
   const changePasswordInput = z.object({
      username: usernameSchema,
   });

   return changePasswordInput.safeParse({ username });
}
