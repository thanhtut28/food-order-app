import { db } from "../../../utils/db";
import errorHandler from "../../../utils/error-handler";
import { builder } from "../../builder";
import { CheckoutCartInput } from "./schema";

builder.mutationFields(t => ({
   checkoutCart: t.prismaField({
      type: "Order",
      nullable: true,
      skipTypeScopes: true,
      args: {
         input: t.arg({
            type: [CheckoutCartInput],
            required: true,
         }),
      },
      resolve: async (query, _, { input }, { req }) => {
         console.log(input);
         const total = input.reduce((acc, cur) => acc + cur.total, 0);
         // const userId = req.session.userId;
         // if (!userId) {
         //    errorHandler.throwAuthError();
         //    return null;
         // }
         return db.order.create({
            // ...query,
            data: {
               userId: 2,
               total,
               orderItems: {
                  create: input,
               },
            },
         });
      },
   }),
}));
