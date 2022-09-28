import { MenuItem } from "@prisma/client";
import { db } from "../../../utils/db";
import { builder } from "../../builder";
import { FeaturedItemsResponse } from "./schema";

builder.queryFields(t => ({
   getAllMenuItems: t.prismaField({
      type: ["MenuItem"],
      skipTypeScopes: true,
      resolve: async query => {
         return db.menuItem.findMany({
            ...query,
            where: {
               ingredients: {
                  some: {
                     // query items that have at least one ingredient.
                     name: {
                        contains: "beef",
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
         }),
      },
      resolve: async (query, _, { categoryId }) => {
         return db.menuItem.findMany({
            ...query,
            where: {
               ...(categoryId ? { categoryId } : {}),
            },
            orderBy: {
               categoryId: "asc",
               // name: "asc",
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

   getFeaturedItems: t.prismaField({
      type: ["MenuItem"],
      skipTypeScopes: true,
      resolve: async query => {
         const categories = await db.category.findMany({ select: { name: true } });
         let menuItems: MenuItem[] = [];

         for (let i = 0; i < categories.length; i++) {
            const item = await db.menuItem.findFirst({
               ...query,
               where: {
                  category: categories[i],
               },
            });
            if (item) {
               menuItems.push(item);
            }
         }

         return menuItems;
      },
   }),
}));
