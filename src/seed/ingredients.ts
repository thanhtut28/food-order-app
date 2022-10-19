import { db } from "../utils/db";

const seedData = async () => {
   const ingredients = await db.ingredient.createMany({
      data: [
         {
            name: "grilled beef",
         },
         {
            name: "",
         },
      ],
   });
};
