import type { Prisma, User, MenuItem, Category, Cart, Order } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        RelationName: "order" | "cart";
        ListRelations: "order";
        Relations: {
            order: {
                Shape: Order[];
                Types: PrismaTypes["Order"];
            };
            cart: {
                Shape: Cart | null;
                Types: PrismaTypes["Cart"];
            };
        };
    };
    MenuItem: {
        Name: "MenuItem";
        Shape: MenuItem;
        Include: Prisma.MenuItemInclude;
        Select: Prisma.MenuItemSelect;
        OrderBy: Prisma.MenuItemOrderByWithRelationInput;
        WhereUnique: Prisma.MenuItemWhereUniqueInput;
        Where: Prisma.MenuItemWhereInput;
        RelationName: "category" | "order" | "cart";
        ListRelations: "order" | "cart";
        Relations: {
            category: {
                Shape: Category | null;
                Types: PrismaTypes["Category"];
            };
            order: {
                Shape: Order[];
                Types: PrismaTypes["Order"];
            };
            cart: {
                Shape: Cart[];
                Types: PrismaTypes["Cart"];
            };
        };
    };
    Category: {
        Name: "Category";
        Shape: Category;
        Include: Prisma.CategoryInclude;
        Select: Prisma.CategorySelect;
        OrderBy: Prisma.CategoryOrderByWithRelationInput;
        WhereUnique: Prisma.CategoryWhereUniqueInput;
        Where: Prisma.CategoryWhereInput;
        RelationName: "product";
        ListRelations: never;
        Relations: {
            product: {
                Shape: MenuItem;
                Types: PrismaTypes["MenuItem"];
            };
        };
    };
    Cart: {
        Name: "Cart";
        Shape: Cart;
        Include: Prisma.CartInclude;
        Select: Prisma.CartSelect;
        OrderBy: Prisma.CartOrderByWithRelationInput;
        WhereUnique: Prisma.CartWhereUniqueInput;
        Where: Prisma.CartWhereInput;
        RelationName: "user" | "menuItem";
        ListRelations: "menuItem";
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            menuItem: {
                Shape: MenuItem[];
                Types: PrismaTypes["MenuItem"];
            };
        };
    };
    Order: {
        Name: "Order";
        Shape: Order;
        Include: Prisma.OrderInclude;
        Select: Prisma.OrderSelect;
        OrderBy: Prisma.OrderOrderByWithRelationInput;
        WhereUnique: Prisma.OrderWhereUniqueInput;
        Where: Prisma.OrderWhereInput;
        RelationName: "user" | "menuItem";
        ListRelations: "menuItem";
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            menuItem: {
                Shape: MenuItem[];
                Types: PrismaTypes["MenuItem"];
            };
        };
    };
}