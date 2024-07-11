import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.queryFields(t => ({
   getOrders: t.prismaField({
      type: ["Order"],
      nullable: true,

      resolve: async (query, _, _args, { req }) => {
         const userId = req.session.userId;
         if (!userId) {
            return null;
         }

         const order = await db.order.findMany({
            ...query,
            where: {
               userId,
            },
         });

         if (!order) {
            return null;
         }

         return order;
      },
   }),
}));
