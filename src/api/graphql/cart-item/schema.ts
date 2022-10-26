import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.prismaObject("CartItem", {
   fields: t => ({
      quantity: t.exposeInt("quantity"),
      menuItemId: t.exposeInt("menuItemId"),
      cartId: t.exposeInt("cartId"),
      menuItem: t.relation("menuItem"),
      cart: t.relation("cart"),
      total: t.exposeFloat("total"),
   }),
});

export const GetCartItemsInput = builder.inputType("GetCartItemsInput", {
   fields: t => ({
      cartId: t.int({ required: true }),
      cursor: t.int(),
   }),
});
