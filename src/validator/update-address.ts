import { z } from "zod";
import { adderssSchema } from "./schema";

export default function updateAddressValidator(address: string) {
   const changePasswordInput = z.object({
      address: adderssSchema,
   });

   return changePasswordInput.safeParse({ address });
}
