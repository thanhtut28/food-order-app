import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.prismaObject("CartItem", {
   fields: t => ({
      quantity: t.exposeInt("quantity"),
      menuItemId: t.exposeInt("menuItemId"),
      cartId: t.exposeInt("cartId"),
      menuItem: t.relation("menuItem"),
      cart: t.relation("cart"),
      total: t.exposeFloat("total"),
   }),
});

export const GetCartItemsInput = builder.inputType("GetCartItemsInput", {
   fields: t => ({
      cartId: t.int({ required: true }),
      cursor: t.int(),
   }),
});

export const AddCartItemInput = builder.inputType("AddCartItemInput", {
   fields: t => ({
      cartId: t.int({ required: true }),
      menuItemId: t.int({ required: true }),
      quantity: t.int({ required: true }),
   }),
});

export const RemoveCartItemInput = builder.inputType("RemoveCartItemInput", {
   fields: t => ({
      cartId: t.int({ required: true }),
      menuItemId: t.int({ required: true }),
   }),
});

export const UpdateCartItemInput = builder.inputType("UpdateCartItemInput", {
   fields: t => ({
      cartId: t.int({ required: true }),
      menuItemId: t.int({ required: true }),
      quantity: t.int({ required: true }),
   }),
});
