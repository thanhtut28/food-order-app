import { string } from "zod";
import { builder } from "../../builder";

export const User = builder.prismaObject("User", {
   fields: t => ({
      id: t.exposeInt("id"),
      username: t.exposeString("username"),
      email: t.exposeString("email"),
      createdAt: t.expose("createdAt", {
         type: "DateTime",
      }),
      updatedAt: t.expose("updatedAt", {
         type: "DateTime",
      }),
   }),
});

export const SignUpUserInput = builder.inputType("SignUpUserInput", {
   fields: t => ({
      email: t.string({ required: true }),
      username: t.string({ required: true }),
      password: t.string({ required: true }),
   }),
});

export const SignInUserInput = builder.inputType("SignInUserInput", {
   fields: t => ({
      email: t.string({ required: true }),
      password: t.string({ required: true }),
   }),
});

export const ChangePasswordInput = builder.inputType("ChangePasswordInput", {
   fields: t => ({
      token: t.string({ required: true }),
      newPassword: t.string({ required: true }),
   }),
});

export const ErrorResponse = builder.simpleObject("ErrorResponse", {
   fields: t => ({
      field: t.string(),
      message: t.string(),
   }),
});

export const AuthenticationResponse = builder.simpleObject("AuthenticationResponse", {
   fields: t => ({
      user: t.field({
         type: User,
         nullable: true,
      }),
      error: t.field({
         type: ErrorResponse,
         nullable: true,
      }),
   }),
});

export const ChangePasswordResponse = builder.simpleObject("ChangePasswordResponse", {
   fields: t => ({
      success: t.boolean(),
      error: t.field({
         type: ErrorResponse,
         nullable: true,
      }),
   }),
});
