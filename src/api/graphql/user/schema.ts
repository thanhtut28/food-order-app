import { builder } from "../../builder";

builder.prismaObject("User", {
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

// export const SignInResponse = builder.asdfasdf;
