/* eslint-disable */
import type { Prisma, User, MenuItem, CartItem, OrderItem, Cart, Order, Category, Ingredient, IngredientItem } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "orders" | "cart";
        ListRelations: "orders";
        Relations: {
            orders: {
                Shape: Order[];
                Name: "Order";
                Nullable: false;
            };
            cart: {
                Shape: Cart | null;
                Name: "Cart";
                Nullable: true;
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
        Create: {};
        Update: {};
        RelationName: "category" | "cartItems" | "orderItems" | "ingredientItems";
        ListRelations: "cartItems" | "orderItems" | "ingredientItems";
        Relations: {
            category: {
                Shape: Category;
                Name: "Category";
                Nullable: false;
            };
            cartItems: {
                Shape: CartItem[];
                Name: "CartItem";
                Nullable: false;
            };
            orderItems: {
                Shape: OrderItem[];
                Name: "OrderItem";
                Nullable: false;
            };
            ingredientItems: {
                Shape: IngredientItem[];
                Name: "IngredientItem";
                Nullable: false;
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
        Create: {};
        Update: {};
        RelationName: "menuItem" | "cart";
        ListRelations: never;
        Relations: {
            menuItem: {
                Shape: MenuItem;
                Name: "MenuItem";
                Nullable: false;
            };
            cart: {
                Shape: Cart;
                Name: "Cart";
                Nullable: false;
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
        Create: {};
        Update: {};
        RelationName: "menuItem" | "order";
        ListRelations: never;
        Relations: {
            menuItem: {
                Shape: MenuItem;
                Name: "MenuItem";
                Nullable: false;
            };
            order: {
                Shape: Order;
                Name: "Order";
                Nullable: false;
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
        Create: {};
        Update: {};
        RelationName: "user" | "cartItems";
        ListRelations: "cartItems";
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            cartItems: {
                Shape: CartItem[];
                Name: "CartItem";
                Nullable: false;
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
        Create: {};
        Update: {};
        RelationName: "user" | "orderItems";
        ListRelations: "orderItems";
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            orderItems: {
                Shape: OrderItem[];
                Name: "OrderItem";
                Nullable: false;
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
        Create: {};
        Update: {};
        RelationName: "menuItems";
        ListRelations: "menuItems";
        Relations: {
            menuItems: {
                Shape: MenuItem[];
                Name: "MenuItem";
                Nullable: false;
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
        Create: {};
        Update: {};
        RelationName: "ingredientItems";
        ListRelations: "ingredientItems";
        Relations: {
            ingredientItems: {
                Shape: IngredientItem[];
                Name: "IngredientItem";
                Nullable: false;
            };
        };
    };
    IngredientItem: {
        Name: "IngredientItem";
        Shape: IngredientItem;
        Include: Prisma.IngredientItemInclude;
        Select: Prisma.IngredientItemSelect;
        OrderBy: Prisma.IngredientItemOrderByWithRelationInput;
        WhereUnique: Prisma.IngredientItemWhereUniqueInput;
        Where: Prisma.IngredientItemWhereInput;
        Create: {};
        Update: {};
        RelationName: "menuItem" | "ingredient";
        ListRelations: never;
        Relations: {
            menuItem: {
                Shape: MenuItem;
                Name: "MenuItem";
                Nullable: false;
            };
            ingredient: {
                Shape: Ingredient;
                Name: "Ingredient";
                Nullable: false;
            };
        };
    };
}