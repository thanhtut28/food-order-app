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
      resolve: async (query, _, { input: { cartId, cursor } }) => {
         return db.cartItem.findMany({
            ...query,
            ...(cartId && cursor
               ? {
                    cursor: {
                       cartId_menuItemId: {
                          cartId: cartId,
                          menuItemId: cursor,
                       },
                    },
                    skip: 1,
                 }
               : {}),
            // take: 3,
            where: {
               cartId,
            },
         });
      },
   }),
}));
