import { query } from "express";
import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.mutationFields(t => ({
   createCategory: t.prismaField({
      type: "Category",
      skipTypeScopes: true,
      args: {
         name: t.arg({ type: "String", required: true }),
      },
      resolve: async (_query, _, { name }) => {
         return db.category.create({
            ...query,
            data: {
               name,
            },
         });
      },
   }),
}));
