import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.mutationFields(t => ({
   // addCartItem: t.prismaField({
   //    type: "CartItem",
   //    args: {
   //       input: t.arg({
   //          type: AddCartItemInput,
   //          required: true,
   //       }),
   //    },
   //    resolve: async (query, _, { input: { cartId, menuItemId, quantity } }) => {
   //       const menuItem = await db.menuItem.findUniqueOrThrow({ where: { id: menuItemId } });
   //       const cartItem = await db.cartItem.create({
   //          ...query,
   //          data: {
   //             quantity,
   //             cartId,
   //             menuItemId: menuItem.id,
   //             total: menuItem.price * quantity,
   //          },
   //       });
   //       return cartItem;
   //    },
   // }),
}));
