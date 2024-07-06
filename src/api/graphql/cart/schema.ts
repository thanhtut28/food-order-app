import { db } from "../../../utils/db";
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
      total: t.field({
         type: "Float",
         resolve: async root => {
            const cartItems = await db.cartItem.findMany({ where: { cartId: root.id } });
            const total = cartItems.reduce((acc, cur) => acc + cur.total, 0);

            return +total.toFixed(2);
         },
      }),
   }),
});

export const CartActionsInput = builder.inputType("CartActionsInput", {
   fields: t => ({
      menuItemId: t.int({ required: true }),
      cartId: t.int({ required: true }),
      qty: t.int({ required: true }),
   }),
});
