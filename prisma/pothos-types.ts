import type { Prisma, User, MenuItem, CartItem, OrderItem, Cart, Order, Category, Ingredient } from "@prisma/client";
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
        RelationName: "category" | "cartItems" | "orderItems" | "ingredients";
        ListRelations: "cartItems" | "orderItems" | "ingredients";
        Relations: {
            category: {
                Shape: Category | null;
                Types: PrismaTypes["Category"];
            };
            cartItems: {
                Shape: CartItem[];
                Types: PrismaTypes["CartItem"];
            };
            orderItems: {
                Shape: OrderItem[];
                Types: PrismaTypes["OrderItem"];
            };
            ingredients: {
                Shape: Ingredient[];
                Types: PrismaTypes["Ingredient"];
            };
        };
    };
    CartItem: {
        Name: "CartItem";
        Shape: CartItem;
        Include: Prisma.CartItemInclude;
        Select: Prisma.CartItemSelect;
        OrderBy: Prisma.CartItemOrderByWithRelationInput;
        WhereUnique: Prisma.CartItemWhereUniqueInput;
        Where: Prisma.CartItemWhereInput;
        RelationName: "menuItem" | "cart";
        ListRelations: never;
        Relations: {
            menuItem: {
                Shape: MenuItem;
                Types: PrismaTypes["MenuItem"];
            };
            cart: {
                Shape: Cart;
                Types: PrismaTypes["Cart"];
            };
        };
    };
    OrderItem: {
        Name: "OrderItem";
        Shape: OrderItem;
        Include: Prisma.OrderItemInclude;
        Select: Prisma.OrderItemSelect;
        OrderBy: Prisma.OrderItemOrderByWithRelationInput;
        WhereUnique: Prisma.OrderItemWhereUniqueInput;
        Where: Prisma.OrderItemWhereInput;
        RelationName: "menuItem" | "order";
        ListRelations: never;
        Relations: {
            menuItem: {
                Shape: MenuItem;
                Types: PrismaTypes["MenuItem"];
            };
            order: {
                Shape: Order;
                Types: PrismaTypes["Order"];
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
        RelationName: "user" | "cartItems";
        ListRelations: "cartItems";
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            cartItems: {
                Shape: CartItem[];
                Types: PrismaTypes["CartItem"];
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
        RelationName: "user" | "orderItems";
        ListRelations: "orderItems";
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            orderItems: {
                Shape: OrderItem[];
                Types: PrismaTypes["OrderItem"];
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