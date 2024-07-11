import { toCents, toDollars } from "../../../utils/currency-convert";
import { db } from "../../../utils/db";
import { delay } from "../../../utils/delay";
import errorHandler from "../../../utils/error-handler";
import { builder } from "../../builder";
import { CartItemsInput } from "./schema";

builder.mutationFields(t => ({
   placeOrder: t.prismaField({
      type: "Order",
      nullable: true,
      args: {
         cartItems: t.arg({
            type: [CartItemsInput],
            required: true,
         }),
         total: t.arg({
            type: "Float",
            required: true,
         }),
         cartId: t.arg({
            type: "Int",
            required: true,
         }),
      },
      resolve: async (query, _, { cartItems, total, cartId }, { req }) => {
         const totalPrice = toDollars(toCents(total));
         const userId = req.session.userId;
         if (!userId) {
            errorHandler.throwAuthError();
            return null;
         }

         const [order, removedCartItems] = await db.$transaction([
            db.order.create({
               ...query,
               data: {
                  userId,
                  total: totalPrice,
                  orderItems: {
                     create: cartItems,
                  },
               },
            }),
            db.cart.update({
               where: {
                  id: cartId,
               },
               data: {
                  total: 0,
                  cartItems: {
                     deleteMany: { cartId },
                  },
               },
            }),
         ]);
         await delay();
         console.log("place order", order, removedCartItems);
         return order;
      },
   }),
}));
