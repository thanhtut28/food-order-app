import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.prismaObject("CartItem", {
   fields: t => ({
      id: t.exposeInt("id"),
      quantity: t.exposeInt("quantity"),
      menuItemId: t.exposeInt("menuItemId"),
      cartId: t.exposeInt("cartId"),
      menuItem: t.relation("menuItem"),
      cart: t.relation("menuItem"),
      total: t.exposeFloat("total"),
   }),
});
