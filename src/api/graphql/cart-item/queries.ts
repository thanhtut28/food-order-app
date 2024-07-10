import { ErrorMessage } from "../../../constants/message";
import { db } from "../../../utils/db";
import { delay } from "../../../utils/delay";
import errorHandler from "../../../utils/error-handler";
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
                    skip: 1,
                    cursor: {
                       cartId_menuItemId: {
                          cartId,
                          menuItemId: cursor,
                       },
                    },
                 }
               : {}),
            take: 5,
            where: {
               cartId,
            },
            orderBy: {
               createdAt: "desc",
            },
         });
      },
   }),
}));
