import { db } from "../../../utils/db";
import { builder } from "../../builder";
import { GetOrderItemsInput } from "./schema";

builder.queryFields(t => ({
   getOrderItems: t.prismaField({
      type: ["OrderItem"],
      args: {
         input: t.arg({ type: GetOrderItemsInput, required: true }),
      },
      skipTypeScopes: true,
      resolve: async (query, _, { input: { orderId, cursor } }) => {
         return db.orderItem.findMany({
            ...query,
            ...(orderId && cursor
               ? {
                    skip: 1,
                    cursor: {
                       menuItemId_orderId: {
                          orderId,
                          menuItemId: cursor,
                       },
                    },
                 }
               : {}),
            take: 5,
            where: {
               orderId,
            },
            orderBy: {
               createdAt: "desc",
            },
         });
      },
   }),
}));
