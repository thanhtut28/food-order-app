import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.mutationFields(t => ({
   createIngredient: t.prismaField({
      type: "Ingredient",
      skipTypeScopes: true,
      args: {
         name: t.arg({
            type: "String",
            required: true,
         }),
      },
      resolve: async (query, _, { name }) => {
         return db.ingredient.create({
            ...query,
            data: {
               name,
            },
         });
      },
   }),
}));
