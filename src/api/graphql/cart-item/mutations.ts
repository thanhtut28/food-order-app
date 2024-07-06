import { db } from "../../../utils/db";
import { delay } from "../../../utils/delay";
import errorHandler from "../../../utils/error-handler";
import { builder } from "../../builder";
import { AddCartItemInput, RemoveCartItemInput, UpdateCartItemInput } from "./schema";

builder.mutationFields(t => ({
   addToCart: t.prismaField({
      type: "CartItem",
      skipTypeScopes: true,
      nullable: true,
      args: {
         input: t.arg({
            type: AddCartItemInput,
            required: true,
         }),
      },
      resolve: async (query, _, { input: { cartId, menuItemId, quantity } }) => {
         const existingItem = await db.cartItem.findFirst({ where: { menuItemId, cartId } });

         const menuItem = await db.menuItem.findUnique({ where: { id: menuItemId } });

         const total = +(menuItem?.price! * quantity).toFixed(2);

         try {
            if (existingItem) {
               return await db.cartItem.update({
                  ...query,
                  data: {
                     quantity: { increment: quantity },
                     total: {
                        increment: total,
                     },
                  },
                  where: {
                     cartId_menuItemId: {
                        cartId,
                        menuItemId,
                     },
                  },
               });
            }
            return await db.cartItem.create({
               ...query,
               data: {
                  quantity,
                  total,
                  cartId,
                  menuItemId,
               },
            });
         } catch (e) {
            console.log(e);
            return null;
         }
      },
   }),

   removeCartItem: t.field({
      type: "Boolean",
      skipTypeScopes: true,
      args: {
         input: t.arg({
            type: RemoveCartItemInput,
            required: true,
         }),
      },
      resolve: async (query, { input: { cartId, menuItemId } }) => {
         try {
            await db.cartItem.delete({
               ...query,
               where: {
                  cartId_menuItemId: {
                     cartId,
                     menuItemId,
                  },
               },
            });

            return true;
         } catch (e) {
            console.log(e);
            return false;
         }
      },
   }),

   updateCartItem: t.prismaField({
      type: "CartItem",
      skipTypeScopes: true,
      nullable: true,
      args: {
         input: t.arg({
            type: UpdateCartItemInput,
            required: true,
         }),
      },
      resolve: async (query, _, { input: { cartId, menuItemId, quantity } }) => {
         const menuItem = await db.menuItem.findUnique({ where: { id: menuItemId } });

         const total = +(menuItem?.price! * quantity).toFixed(2);

         try {
            const cartItem = await db.cartItem.update({
               ...query,
               data: {
                  total,
                  quantity,
               },
               where: {
                  cartId_menuItemId: {
                     cartId,
                     menuItemId,
                  },
               },
            });

            return cartItem;
         } catch (e) {
            console.log(e);
            return null;
         }
      },
   }),
}));
