import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.queryFields(t => ({
   getAllIngredients: t.prismaField({
      type: ["Ingredient"],
      resolve: (query, _) => {
         return db.ingredient.findMany({
            ...query,
         });
      },
   }),
}));
