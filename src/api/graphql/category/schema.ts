import { builder } from "../../builder";

export const Category = builder.prismaObject("Category", {
   fields: t => ({
      id: t.exposeInt("id"),
      createdAt: t.expose("createdAt", {
         type: "DateTime",
      }),
      updatedAt: t.expose("updatedAt", {
         type: "DateTime",
      }),
      name: t.exposeString("name"),
      menuItems: t.relation("menuItems"),
      //   orders: t.relation("orders"),
      //   carts: t.relation("carts"),
   }),
});
