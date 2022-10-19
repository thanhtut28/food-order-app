import { db } from "../utils/db";

const seedData = async () => {
   const categories = await db.category.createMany({
      data: [
         //  {
         //     name: "burgers",
         //  },
         {
            name: "desserts",
         },
         {
            name: "beverages",
         },
         {
            name: "snacks",
         },
      ],
   });
   return categories;
};

seedData();
