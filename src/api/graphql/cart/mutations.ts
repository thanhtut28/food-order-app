import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.mutationFields(t => ({
   createNewCart: t.prismaField({
      type: "Cart",
      nullable: true,
      resolve: async (query, _, {}, { req, res }) => {
         const user = await db.user.findUnique({
            where: {
               id: req.session.userId,
            },
         });

         if (!user) {
            return null;
         }

         return db.cart.create({
            data: {
               userId: user.id,
            },
         });
      },
   }),
}));
