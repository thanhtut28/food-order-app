import { MenuItem } from "@prisma/client";
import { db } from "../../../utils/db";
import { builder } from "../../builder";
import { FeaturedItemsResponse, GetMenuItemsInput } from "./schema";

builder.queryFields(t => ({
   getAllMenuItems: t.prismaField({
      type: ["MenuItem"],
      skipTypeScopes: true,
      resolve: async query => {
         return db.menuItem.findMany({
            ...query,
            // where: {
            //    ingredientItems: {
            //       some: {
            //          // query items that have at least one ingredient.
            //          menuItemId: {
            //             not: undefined,
            //          },
            //          ingredientId: {
            //             not: undefined,
            //          },
            //       },
            //    },
            // },
         });
      },
   }),

   getMenuItemsByCategory: t.prismaField({
      type: ["MenuItem"],
      skipTypeScopes: true,
      args: {
         input: t.arg({
            type: GetMenuItemsInput,
            required: true,
         }),
      },
      resolve: async (query, _, { input: { categoryId, cursor } }) => {
         return db.menuItem.findMany({
            ...query,
            ...(cursor
               ? {
                    skip: 1,
                    cursor: {
                       id: cursor,
                    },
                 }
               : {}),
            take: 8,
            where: {
               ...(categoryId ? { categoryId } : {}),
            },
            orderBy: {
               // categoryId: "asc",
               id: "asc",
               // name: "asc",
            },
         });
      },
   }),

   // getMenuItemsByIngredient: t.prismaField({
   //    type: ["MenuItem"],
   //    skipTypeScopes: true,
   //    args: {
   //       ingredientId: t.arg({
   //          type: "Int",
   //          required: true,
   //       }),
   //    },
   //    resolve: async (query, _, { ingredientId }) => {
   //       return db.menuItem.findMany({
   //          ...query,
   //          where: {
   //             ingredientItems: {
   //                some: {
   //                   ingredientId: ingredientId,
   //                },
   //             },
   //          },
   //       });
   //    },
   // }),

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

   getMenuItemBySlug: t.prismaField({
      type: "MenuItem",
      skipTypeScopes: true,
      nullable: true,
      args: {
         slug: t.arg({
            type: "Int",
            required: true,
         }),
      },
      resolve: async (query, _, { slug }) => {
         const item = await db.menuItem.findUnique({
            ...query,
            where: { id: slug },
            include: {
               ingredientItems: {
                  include: { ingredient: true },
                  orderBy: { order: "asc" },
               },
            },
         });

         return item;
      },
   }),
}));
