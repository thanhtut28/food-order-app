import { builder } from "../../builder";

export const Ingredient = builder.prismaObject("Ingredient", {
   fields: t => ({
      id: t.exposeInt("id"),
      createdAt: t.expose("createdAt", {
         type: "DateTime",
      }),
      updatedAt: t.expose("updatedAt", {
         type: "DateTime",
      }),
      name: t.exposeString("name"),
      // ingredientItems: t.field({
      //    select: (_args, _ctx, nestedSelection) => ({
      //       ingredientItems: {
      //          select: {
      //             menuItem: nestedSelection(true),
      //          },
      //       },
      //    }),
      //    type: [Ingredient],
      //    resolve: ingredient => ingredient.ingredientItems.map(({ menuItem }) => menuItem),
      // }),
      ingredientItems: t.relation("ingredientItems"),
   }),
});
