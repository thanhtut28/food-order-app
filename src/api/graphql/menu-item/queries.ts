import { MenuItem } from "@prisma/client";
import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.queryFields(t => ({
   getAllMenuItems: t.prismaField({
      type: ["MenuItem"],
      skipTypeScopes: true,
      resolve: async (query, _) => {
         return db.menuItem.findMany({
            ...query,
            where: {
               ingredients: {
                  some: {
                     // query items that have at least one ingredient.
                     id: {
                        notIn: [],
                     },
                  },
               },
            },
         });
      },
   }),

   getMenuItemsByCategory: t.prismaField({
      type: ["MenuItem"],
      skipTypeScopes: true,
      args: {
         categoryId: t.arg({
            type: "Int",
            required: true,
         }),
      },
      resolve: async (query, _, { categoryId }) => {
         return db.menuItem.findMany({
            ...query,
            where: {
               categoryId,
            },
         });
      },
   }),

   getMenuItemsByIngredient: t.prismaField({
      type: ["MenuItem"],
      skipTypeScopes: true,
      args: {
         ingredientId: t.arg({
            type: "Int",
            required: true,
         }),
      },
      resolve: async (query, _, { ingredientId }) => {
         return db.menuItem.findMany({
            ...query,
            where: {
               ingredients: {
                  some: {
                     id: ingredientId,
                  },
               },
            },
         });
      },
   }),

   getBannerItems: t.prismaField({
      type: ["MenuItem"],
      nullable: true,
      skipTypeScopes: true,
      resolve: async (query, _) => {
         const chickenBurger = await db.menuItem.findFirst({
            where: {
               ingredients: {
                  some: {
                     name: "fried chicken",
                  },
               },
            },
         });
         const beefBurger = await db.menuItem.findFirst({
            where: {
               ingredients: {
                  some: {
                     name: "grilled beef",
                  },
               },
            },
         });

         if (!chickenBurger || !beefBurger) {
            return null;
         }

         return [chickenBurger, beefBurger];
      },
   }),
}));
