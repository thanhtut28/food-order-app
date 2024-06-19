import { query } from "express";
import { db } from "../../../utils/db";
import { builder } from "../../builder";
import { CreateMenuItemInput, UpdateMenuItemInput } from "./schema";

builder.mutationFields(t => ({
   createMenuItem: t.prismaField({
      type: "MenuItem",
      skipTypeScopes: true,
      args: {
         input: t.arg({
            type: CreateMenuItemInput,
            required: true,
         }),
      },
      resolve: async (_query, _, { input: { name, photo, price, categoryId } }) => {
         return db.menuItem.create({
            ...query,
            data: {
               name,
               photo,
               price,
               categoryId,
            },
         });
      },
   }),

   updateMenuItem: t.prismaField({
      type: "MenuItem",
      skipTypeScopes: true,
      args: {
         input: t.arg({
            type: UpdateMenuItemInput,
            required: true,
         }),
      },
      resolve: async (_query, _, { input: { itemId, name, photo, price, categoryId } }) => {
         return db.menuItem.update({
            where: {
               id: itemId,
            },
            data: {
               ...(name ? { name } : {}),
               ...(photo ? { photo } : {}),
               ...(price ? { price } : {}),
               ...(categoryId ? { categoryId } : {}),
            },
         });
      },
   }),

   // addIngredientToItem: t.prismaField({
   //    type: "MenuItem",
   //    skipTypeScopes: true,
   //    args: {
   //       ingredients: t.arg({
   //          type: ["String"],
   //          required: true,
   //       }),
   //       itemId: t.arg({
   //          type: "Int",
   //          required: true,
   //       }),
   //       ingredientId: t.arg({
   //          type: 'Int',
   //          required: true
   //       })
   //    },
   //    resolve: (query, _, { ingredients, itemId }) => {
   //       const _ingredients = ingredients.map(ingredient => ({ name: ingredient }));

   //       return db.menuItem.update({
   //          where: {
   //             id: itemId,
   //          },
   //          data: {
   //             ingredientItems: {
   //                connect: _ingredients
   //             },
   //          },
   //       });
   //    },
   // }),
}));
