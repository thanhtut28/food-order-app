import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.queryFields(t => ({
   getCart: t.prismaField({
      type: "Cart",
      nullable: true,
      skipTypeScopes: true,
      resolve: async (_query, _, {}, { req }) => {
         const cart = await db.cart.findUnique({
            where: {
               userId: req.session.userId,
            },
            // include: {
            //    cartItems: {
            //       include: {
            //          menuItem: true,
            //       },
            //       skip: 0,
            //       take: 2,
            //    },
            // },
         });
         if (!cart) {
            return null;
         }

         return cart;
      },
   }),
}));
