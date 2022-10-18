import { z } from "zod";

export const emailSchema = z.string().email({ message: "Must be a valid email address" }).trim();
export const usernameSchema = z
   .string()
   .min(5, { message: "Username must be 5 or more characters long" })
   .trim();
export const passwordSchema = z
   .string()
   .min(4, { message: "Password must be 4 or more characters long" })
   .max(20, { message: "Password must be 20 or fewer characters long" });
