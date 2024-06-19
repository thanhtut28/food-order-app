import { builder } from "../../builder";

builder.prismaObject("IngreidentItem", {
   fields: t => ({
      id: t.exposeInt("id"),
      order: t.exposeInt("order"),
      menuItemId: t.exposeInt("menuItemId"),
      menuItem: t.relation("menuItem"),
      ingredientId: t.exposeInt("ingredientId"),
      ingredient: t.relation("ingredient"),
      // ingredientsCount: t.relationCount("ingredient"),
   }),
});
