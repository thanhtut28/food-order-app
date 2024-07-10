import { CartItem } from "@prisma/client";
import { db } from "../../../utils/db";
import { delay } from "../../../utils/delay";
import errorHandler from "../../../utils/error-handler";
import { builder } from "../../builder";
import { AddCartItemInput, RemoveCartItemInput, UpdateCartItemInput } from "./schema";
import { toCents, toDollars } from "../../../utils/currency-convert";
import { ApolloError } from "apollo-server-core";

builder.mutationFields(t => ({
   addToCart: t.prismaField({
      type: "CartItem",
      // skipTypeScopes: true,
      nullable: true,
      args: {
         input: t.arg({
            type: AddCartItemInput,
            required: true,
         }),
      },
      resolve: async (query, _, { input: { cartId, menuItemId, quantity } }) => {
         if (!cartId) {
            errorHandler.throwAuthError();
            return null;
         }

         const menuItem = await db.menuItem.findUnique({ where: { id: menuItemId } });

         const existingItem = await db.cartItem.findUnique({
            where: { cartId_menuItemId: { cartId, menuItemId } },
         });
         const addedItemPrice = toDollars(toCents(menuItem?.price ?? 0) * quantity);

         console.log("added-price", addedItemPrice);

         try {
            if (existingItem) {
               const [_cart, addedCartItem] = await db.$transaction([
                  db.cart.update({
                     where: {
                        id: cartId,
                     },
                     data: {
                        total: {
                           increment: addedItemPrice,
                        },
                     },
                  }),
                  db.cartItem.update({
                     ...query,
                     data: {
                        quantity: { increment: quantity },
                        total: {
                           increment: addedItemPrice,
                        },
                     },
                     where: {
                        cartId_menuItemId: {
                           cartId,
                           menuItemId,
                        },
                     },
                  }),
               ]);
               return addedCartItem;
            }
            const [_cart, addedCartItem] = await db.$transaction([
               db.cart.update({
                  where: {
                     id: cartId,
                  },
                  data: {
                     total: {
                        increment: addedItemPrice,
                     },
                  },
               }),
               db.cartItem.create({
                  ...query,
                  data: {
                     quantity,
                     total: addedItemPrice,
                     cartId,
                     menuItemId,
                  },
               }),
            ]);
            return addedCartItem;
         } catch (e) {
            console.log(e);
            return null;
         }
      },
   }),

   removeCartItem: t.field({
      type: "Boolean",

      args: {
         input: t.arg({
            type: RemoveCartItemInput,
            required: true,
         }),
      },
      resolve: async (query, { input: { cartId, menuItemId } }) => {
         const removedItem = await db.cartItem.findUnique({
            where: { cartId_menuItemId: { cartId, menuItemId } },
         });

         const cartItemsCount = await db.cartItem.count();

         const isLastItem = cartItemsCount === 1;

         try {
            await db.$transaction([
               db.cart.update({
                  where: {
                     id: cartId,
                  },
                  data: {
                     total: isLastItem
                        ? {
                             set: 0,
                          }
                        : {
                             decrement: removedItem?.total ?? 0,
                          },
                  },
               }),
               db.cartItem.delete({
                  ...query,
                  where: {
                     cartId_menuItemId: {
                        cartId,
                        menuItemId,
                     },
                  },
               }),
            ]);

            return true;
         } catch (e) {
            console.log(e);
            return false;
         }
      },
   }),

   updateCartItem: t.prismaField({
      type: "CartItem",

      nullable: true,
      args: {
         input: t.arg({
            type: UpdateCartItemInput,
            required: true,
         }),
      },
      resolve: async (query, _, { input: { cartId, menuItemId, quantity } }) => {
         const menuItem = await db.menuItem.findUnique({ where: { id: menuItemId } });
         const updateItem = await db.cartItem.findUnique({
            where: { cartId_menuItemId: { cartId, menuItemId } },
         });

         const cart = await db.cart.findUnique({ where: { id: cartId } });
         const cartTotal = cart?.total ?? 0;

         const updatedItemPrice = toDollars(toCents(menuItem?.price ?? 0) * quantity);

         //! Instead of fetching all cart items, update the price and sum all prices,
         //! Subtract existing price and add the updated price
         const updatedCartTotal = cartTotal - (updateItem?.total ?? 0) + updatedItemPrice;

         console.log(cartTotal, updateItem?.total, updatedItemPrice);

         try {
            const [_cart, cartItem] = await db.$transaction([
               db.cart.update({
                  where: {
                     id: cartId,
                  },
                  data: {
                     total: updatedCartTotal,
                  },
               }),
               db.cartItem.update({
                  ...query,
                  data: {
                     total: updatedItemPrice,
                     quantity,
                  },
                  where: {
                     cartId_menuItemId: {
                        cartId,
                        menuItemId,
                     },
                  },
               }),
            ]);
            return cartItem;
         } catch (e) {
            console.log(e);
            return null;
         }
      },
   }),
}));
