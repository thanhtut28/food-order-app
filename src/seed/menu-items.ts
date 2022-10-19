import { db } from "../utils/db";

const seedData = async () => {
   console.log("seeding");
   const menuItems = await db.menuItem.createMany({
      data: [
         // {
         //     name: "crazy cheese double bbq",
         //     photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__32759__product_detail/Product-CrazyCheeseBBQDouble-NL-2207-1500px.png",
         //     price: 8.99,
         //     categoryId: 1,
         //  },
         {
            name: "crazy cheese bbq",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__32757__product_detail/Product-CrazyCheeseBBQSingle-NL-2207-1500px.png",
            price: 6.99,
            categoryId: 1,
         },
         {
            name: "crazy cheese bbq chicken",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__32758__product_detail/Product-CrazyCheeseBBQChicken-NL-2207-1500px.png",
            price: 6.99,
            categoryId: 1,
         },
         {
            name: "the whiskey master",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__31986__product_detail/Product-KingsWhiskey-NL-2205-1500px.png",
            price: 7.99,
            categoryId: 1,
         },
         {
            name: "the whiskey master double",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__31987__product_detail/Product-KingsWhiskeyDouble-NL-2205-1500px.png",
            price: 9.99,
            categoryId: 1,
         },
         {
            name: "the parmesan master",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__30522__product_detail/Product-KingsGranaPadano-MAFO-NL-2112.png",
            price: 8.99,
            categoryId: 1,
         },
         {
            name: "the parmesan master double",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__30565__product_detail/Product-KingsGranaPadanoDouble-MAFO-NL-2112-1-1500px.png",
            price: 12.99,
            categoryId: 1,
         },
         {
            name: "crunchy chicken deluxe",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__30565__product_detail/Product-KingsGranaPadanoDouble-MAFO-NL-2112-1-1500px.png",
            price: 6.99,
            categoryId: 1,
         },
         {
            name: "double steakhouse",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__29715__product_detail/Product-DblSteakhouse-2109-1500px.png",
            price: 12.99,
            categoryId: 1,
         },
         {
            name: "whopper",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__29716__product_detail/Product-Whopper-2109-1500px.png",
            price: 7.99,
            categoryId: 1,
         },
         {
            name: "whoppse cheese",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__29712__product_detail/Product-WhopperCheese-2109-1500px.png",
            price: 9.99,
            categoryId: 1,
         },
         {
            name: "crispy chicken",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__29704__product_detail/Product-CrispyChicken-2104-1500px.png",
            price: 5.99,
            categoryId: 1,
         },
         {
            name: "long chicken",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__29700__product_detail/Product-LongChicken-2109-1500px.png",
            price: 5.99,
            categoryId: 1,
         },
         {
            name: "big king",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__29669__product_detail/Product-BigKing-2104-1500px.png",
            price: 9.99,
            categoryId: 1,
         },
         {
            name: "cheeseburger",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__29669__product_detail/Product-BigKing-2104-1500px.png",
            price: 6.99,
            categoryId: 1,
         },
         {
            name: "hamburger",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__29696__product_detail/Product-Hamburger-2109-1500px.png",
            price: 6.99,
            categoryId: 1,
         },
         {
            name: "king shake oreo classic",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__29817__product_detail/Product-KingShake_OREO-2109-1500px.png",
            price: 3.99,
            categoryId: 3,
         },
         {
            name: "hot brownie met ijs",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__29686__product_detail/Product-HotBrownie-2109-1500px.png",
            price: 4.99,
            categoryId: 4,
         },
         {
            name: "onion rings",
            photo: "https://www.burgerking.nl/007_nl/products_nl/image-thumb__29666__product_detail/Product-OnionRings-6pcs-2109-1500px.png",
            price: 3.99,
            categoryId: 5,
         },
      ],
   });

   console.log(menuItems);
   return menuItems;
};

seedData();
