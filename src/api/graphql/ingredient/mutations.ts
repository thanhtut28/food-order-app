import { db } from "../../../utils/db";
import { builder } from "../../builder";
import { CreateIngredientInput } from "./schema";

builder.mutationFields(t => ({
   createIngredient: t.prismaField({
      type: "Ingredient",
      skipTypeScopes: true,
      args: {
         input: t.arg({
            type: CreateIngredientInput,
            required: true,
         }),
      },
      resolve: async (query, _, { input: { name, categories } }) => {
         const _categories = categories.map(category => ({ name: category }));

         return db.ingredient.create({
            ...query,
            data: {
               name,
               categories: {
                  connect: _categories,
               },
            },
         });
      },
   }),
}));
