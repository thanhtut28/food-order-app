import { builder } from "../../builder";

export const CartItem = builder.prismaObject("OrderItem", {
   fields: t => ({
      quantity: t.exposeInt("quantity"),
      menuItemId: t.exposeInt("menuItemId"),
      orderId: t.exposeInt("orderId"),
      menuItem: t.relation("menuItem"),
      order: t.relation("order"),
      total: t.exposeFloat("total"),
   }),
});

export const GetOrderItemsInput = builder.inputType("GetOrderItemsInput", {
   fields: t => ({
      orderId: t.int({ required: true }),
      cursor: t.int(),
   }),
});
