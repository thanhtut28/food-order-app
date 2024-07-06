import { db } from "../../../utils/db";
import errorHandler from "../../../utils/error-handler";
import { builder } from "../../builder";

builder.queryFields(t => ({
   getCart: t.prismaField({
      type: "Cart",
      nullable: true,
      skipTypeScopes: true,
      resolve: async (query, _, {}, { req }) => {
         // const userId = req.session.userId;
         // if (!userId) {
         //    return null;
         // }

         const cart = await db.cart.findFirst({
            ...query,
            where: {
               userId: 2,
            },
         });

         if (!cart) {
            return null;
         }

         return cart;
      },
   }),
}));
