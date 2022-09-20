import { builder } from "../../builder";

export const Ingredient = builder.prismaObject("Ingredient", {
   fields: t => ({
      id: t.exposeInt("id"),
      createdAt: t.expose("createdAt", {
         type: "DateTime",
      }),
      updatedAt: t.expose("updatedAt", {
         type: "DateTime",
      }),
      name: t.exposeString("name"),
      menuItems: t.relation("menuItems"),
      categories: t.relation("categories"),
   }),
});

export const CreateIngredientInput = builder.inputType("CreateIngredientInput", {
   fields: t => ({
      name: t.string({ required: true }),
      categories: t.stringList({ required: true }),
   }),
});
