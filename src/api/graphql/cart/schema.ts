import { builder } from "../../builder";

builder.prismaObject("Cart", {
   fields: t => ({
      id: t.exposeInt("id"),
      createdAt: t.expose("createdAt", {
         type: "DateTime",
      }),
      updatedAt: t.expose("updatedAt", {
         type: "DateTime",
      }),
      userId: t.exposeInt("userId"),
      user: t.relation("user"),
      cartItems: t.relation("cartItems"),
      cartItemsCount: t.relationCount("cartItems"),
   }),
});

export const CartActionsInput = builder.inputType("AddCartItemInput", {
   fields: t => ({
      menuItemId: t.int({ required: true }),
      cartId: t.int({ required: true }),
      qty: t.int({ required: true }),
   }),
});
