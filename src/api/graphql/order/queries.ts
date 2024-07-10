import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.queryFields(t => ({
   getOrder: t.prismaField({
      type: "Order",
      args: {
         id: t.arg({ type: "ID", required: true }),
      },
      nullable: true,
      resolve: async (query, _, { id }, { req }) => {
         const userId = req.session.userId;
         if (!userId) {
            return null;
         }

         const order = await db.order.findUnique({
            ...query,
            where: {
               id: id as number,
            },
         });

         if (!order) {
            return null;
         }

         return order;
      },
   }),
}));
