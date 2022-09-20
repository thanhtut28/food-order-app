import type { Prisma, User, MenuItem, Category, Cart, Order, Ingredient } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        RelationName: "orders" | "cart";
        ListRelations: "orders";
        Relations: {
            orders: {
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
        RelationName: "category" | "orders" | "carts" | "ingredients";
        ListRelations: "orders" | "carts" | "ingredients";
        Relations: {
            category: {
                Shape: Category | null;
                Types: PrismaTypes["Category"];
            };
            orders: {
                Shape: Order[];
                Types: PrismaTypes["Order"];
            };
            carts: {
                Shape: Cart[];
                Types: PrismaTypes["Cart"];
            };
            ingredients: {
                Shape: Ingredient[];
                Types: PrismaTypes["Ingredient"];
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
        RelationName: "menuItems" | "ingredients";
        ListRelations: "menuItems" | "ingredients";
        Relations: {
            menuItems: {
                Shape: MenuItem[];
                Types: PrismaTypes["MenuItem"];
            };
            ingredients: {
                Shape: Ingredient[];
                Types: PrismaTypes["Ingredient"];
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
        RelationName: "user" | "menuItems";
        ListRelations: "menuItems";
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            menuItems: {
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
        RelationName: "user" | "menuItems";
        ListRelations: "menuItems";
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            menuItems: {
                Shape: MenuItem[];
                Types: PrismaTypes["MenuItem"];
            };
        };
    };
    Ingredient: {
        Name: "Ingredient";
        Shape: Ingredient;
        Include: Prisma.IngredientInclude;
        Select: Prisma.IngredientSelect;
        OrderBy: Prisma.IngredientOrderByWithRelationInput;
        WhereUnique: Prisma.IngredientWhereUniqueInput;
        Where: Prisma.IngredientWhereInput;
        RelationName: "menuItems" | "categories";
        ListRelations: "menuItems" | "categories";
        Relations: {
            menuItems: {
                Shape: MenuItem[];
                Types: PrismaTypes["MenuItem"];
            };
            categories: {
                Shape: Category[];
                Types: PrismaTypes["Category"];
            };
        };
    };
}