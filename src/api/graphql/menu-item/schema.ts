import { builder } from "../../builder";

export const MenuItem = builder.prismaObject("MenuItem", {
   fields: t => ({
      id: t.exposeInt("id"),
      createdAt: t.expose("createdAt", {
         type: "DateTime",
      }),
      updatedAt: t.expose("updatedAt", {
         type: "DateTime",
      }),
      name: t.exposeString("name"),
      photo: t.exposeString("photo"),
      price: t.exposeFloat("price"),
      categortId: t.exposeInt("categoryId", { nullable: true }),
      category: t.relation("category", { nullable: true }),
      ingredients: t.relation("ingredients"),
      ingredientsCount: t.relationCount("ingredients"),
      //   orders: t.relation("orders"),
      //   carts: t.relation("carts"),
   }),
});

export const CreateMenuItemInput = builder.inputType("CreateMenuItemInput", {
   fields: t => ({
      name: t.string({ required: true }),
      photo: t.string({ required: true }),
      price: t.float({ required: true }),
      categoryId: t.int(),
   }),
});

export const UpdateMenuItemInput = builder.inputType("UpdateMenuItemInput", {
   fields: t => ({
      itemId: t.int({ required: true }),
      name: t.string(),
      photo: t.string(),
      price: t.float(),
      categoryId: t.int(),
   }),
});
