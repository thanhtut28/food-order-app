import { z, SafeParseReturnType } from "zod";

interface SignUpInput {
   email: string;
   username: string;
   password: string;
}

export type SignUpSchemaData = SafeParseReturnType<SignUpInput, SignUpInput>;

export default function signUpValidator(email: string, username: string, password: string) {
   const emailSchema = z.string().email({ message: "Must be a valid email address" }).trim();
   const usernameSchema = z
      .string()
      .min(5, { message: "Username must be 5 or more characters long" })
      .trim();
   const passwordSchema = z
      .string()
      .min(4, { message: "Password must be 4 or more characters long" })
      .max(20, { message: "Must be 20 or fewer characters long" });

   const SignUpInput = z.object({
      email: emailSchema,
      username: usernameSchema,
      password: passwordSchema,
   });

   return SignUpInput.safeParse({ email, username, password });
}
