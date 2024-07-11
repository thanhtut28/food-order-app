import { db } from "../../../utils/db";
import { builder } from "../../builder";
import { CartItem } from "../cart-item/schema";

builder.prismaObject("Order", {
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
      orderItems: t.relation("orderItems"),
      total: t.exposeFloat("total"),
   }),
});

export const CartItemsInput = builder.inputType("CartItemsInput", {
   fields: t => ({
      menuItemId: t.int({ required: true }),
      quantity: t.int({ required: true }),
      total: t.float({ required: true }),
   }),
});
