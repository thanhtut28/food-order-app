import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.queryFields(t => ({
   getAllCategories: t.prismaField({
      type: ["Category"],
      skipTypeScopes: true,
      resolve: async (query, _) => {
         return db.category.findMany({
            ...query,
            where: {
               menuItems: {
                  some: {
                     NOT: [],
                  },
               },
            },
         });
      },
   }),
}));
