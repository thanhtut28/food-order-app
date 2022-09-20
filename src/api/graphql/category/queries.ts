import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.queryFields(t => ({
   getAllCategories: t.prismaField({
      type: ["Category"],
      resolve: async (query, _) => {
         return db.category.findMany({
            ...query,
         });
      },
   }),
}));
