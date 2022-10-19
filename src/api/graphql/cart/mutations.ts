import { Cart, CartItem } from "@prisma/client";
import { db } from "../../../utils/db";
import { builder } from "../../builder";
import { CartActionsInput } from "./schema";

builder.mutationFields(t => ({
   createNewCart: t.prismaField({
      type: "Cart",
      nullable: true,
      resolve: async (query, _, {}, { req, res }) => {
         const user = await db.user.findUnique({
            where: {
               id: req.session.userId,
            },
         });

         if (!user) {
            return null;
         }

         return db.cart.create({
            data: {
               userId: user.id,
            },
         });
      },
   }),

   addToCart: t.prismaField({
      type: "Cart",
      nullable: true,
      skipTypeScopes: true,
      args: {
         input: t.arg({
            type: CartActionsInput,
            required: true,
         }),
      },
      resolve: async (query, _, { input: { cartId, menuItemId } }) => {
         const existingItem = await db.cartItem.findFirst({ where: { menuItemId, cartId } });

         const menuItem = await db.menuItem.findUnique({ where: { id: menuItemId } });

         const cart = await db.cart.update({
            where: {
               id: cartId,
            },
            data: {
               ...query,
               cartItems: {
                  ...(existingItem
                     ? {
                          create: { menuItemId, quantity: 1, total: menuItem?.price! },
                       }
                     : {
                          //   update: {
                          //      data: {
                          //         quantity: { increment: 1 },
                          //         total: { increment: menuItem?.price! },
                          //      },
                          //      where: {
                          //         id: existingItem.id,
                          //      },
                          //   },
                       }),
               },
            },
         });

         return cart;
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
