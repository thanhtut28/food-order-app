import { Cart, CartItem } from "@prisma/client";
import { db } from "../../../utils/db";
import errorHandler from "../../../utils/error-handler";
import { builder } from "../../builder";
import { CartActionsInput } from "./schema";
import { delay } from "../../../utils/delay";

builder.mutationFields(t => ({
   createNewCart: t.field({
      type: "Boolean",
      skipTypeScopes: true,
      resolve: async (_, {}, { req, res }) => {
         //TODO: to optimize code
         try {
            const user = await db.user.findUnique({
               where: {
                  id: req.session.userId,
               },
            });

            if (!user) {
               errorHandler.throwAuthError();
               return false;
            }

            await db.cart.create({
               data: {
                  userId: user.id,
               },
            });
            return true;
         } catch (e) {
            errorHandler.throwDbError({ message: "Failed to create cart" });
            return false;
         }
      },
   }),

   addToCart: t.field({
      type: "Boolean",
      nullable: true,
      skipTypeScopes: true,
      args: {
         input: t.arg({
            type: CartActionsInput,
            required: true,
         }),
      },
      resolve: async (_, { input: { cartId, menuItemId, qty } }, { req }) => {
         const existingItem = await db.cartItem.findFirst({ where: { menuItemId, cartId } });

         const menuItem = await db.menuItem.findUnique({ where: { id: menuItemId } });

         await delay();

         const total = menuItem?.price! * qty;

         try {
            await db.cart.update({
               where: {
                  id: cartId,
               },
               data: {
                  // ...query,
                  cartItems: {
                     ...(!existingItem
                        ? {
                             create: { menuItemId, quantity: qty, total },
                          }
                        : {
                             update: {
                                data: {
                                   quantity: { increment: qty },
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
                             },
                          }),
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

   removeFromCart: t.prismaField({
      type: "Cart",
      args: {
         input: t.arg({
            type: CartActionsInput,
            required: true,
         }),
      },
      nullable: true,
      skipTypeScopes: true,
      resolve: async (query, _, { input: { cartId, menuItemId } }) => {
         const cartItem = (await db.cartItem.findFirst({
            where: { cartId, menuItemId },
         })) as CartItem;

         const menuItem = await db.menuItem.findUnique({ where: { id: menuItemId } });

         const cart = await db.cart.update({
            where: {
               id: cartId,
            },
            data: {
               ...query,
               cartItems: {
                  ...(cartItem.quantity === 1
                     ? {
                          delete: {
                             cartId_menuItemId: {
                                cartId,
                                menuItemId,
                             },
                          },
                       }
                     : {
                          update: {
                             data: {
                                quantity: { decrement: 1 },
                                total: { decrement: menuItem?.price! },
                             },
                             where: {
                                cartId_menuItemId: {
                                   cartId,
                                   menuItemId,
                                },
                             },
                          },
                       }),
               },
            },
         });

         return cart;
      },
   }),
}));
