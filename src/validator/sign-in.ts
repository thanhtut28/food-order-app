import { z, SafeParseReturnType } from "zod";

interface SignInInput {
   email: string;
   password: string;
}

export type SignInSchemaData = SafeParseReturnType<SignInInput, SignInInput>;

export default function signInValidator(email: string, password: string): SignInSchemaData {
   const emailSchema = z.string().email({ message: "Must be a valid email address" }).trim();
   const passwordSchema = z
      .string()
      .min(4, { message: "Password must be 4 or more characters long" })
      .max(20, { message: "Must be 20 or fewer characters long" });

   const SignUpInput = z.object({
      email: emailSchema,
      password: passwordSchema,
   });

   return SignUpInput.safeParse({ email, password });
}
