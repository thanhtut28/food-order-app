import { db } from "../../../utils/db";
import { builder } from "../../builder";
import { GetCartItemsInput } from "./schema";

builder.queryFields(t => ({
   getCartItems: t.prismaField({
      type: ["CartItem"],
      args: {
         input: t.arg({ type: GetCartItemsInput, required: true }),
      },
      skipTypeScopes: true,
      resolve: async (query, _, { input: { cartId, cursor_cartId, cursor_menuItemId } }) => {
         return db.cartItem.findMany({
            ...query,
            // ...(cursor
            //    ? {
            //         cursor: {
            //            cartId_menuItemId: {
            //               cartId: cursor_cartId,
            //               menuItemId: cursor_menuItemId,
            //            },
            //         },
            //         skip: 1,
            //         take: 2,
            //      }
            //    : {}),
            where: {
               cartId,
            },
         });
      },
   }),
}));
