import { db } from "../utils/db";

(async () => {
   const ingredients = await db.ingredient.createMany({
      data: [
         {
            name: "bread",
         },
         {
            name: "lettuce",
         },
         {
            name: "mushroom",
         },
         {
            name: "tomato",
         },
         {
            name: "cheese",
         },
         {
            name: "chicken",
         },
         {
            name: "sausage",
         },
         {
            name: "salami",
         },
         {
            name: "bacon",
         },
         {
            name: "patty",
         },
         {
            name: "onion",
         },
         {
            name: "ham",
         },
         {
            name: "ribs",
         },
      ],
   });
   return ingredients;
})();
