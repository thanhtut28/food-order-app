/*
  Warnings:

  - You are about to drop the `_CategoryToIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IngredientToMenuItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToIngredient" DROP CONSTRAINT "_CategoryToIngredient_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToIngredient" DROP CONSTRAINT "_CategoryToIngredient_B_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToMenuItem" DROP CONSTRAINT "_IngredientToMenuItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToMenuItem" DROP CONSTRAINT "_IngredientToMenuItem_B_fkey";

-- DropTable
DROP TABLE "_CategoryToIngredient";

-- DropTable
DROP TABLE "_IngredientToMenuItem";

-- CreateTable
CREATE TABLE "IngreidentOnItem" (
    "order" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "menuItemId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "IngreidentOnItem_pkey" PRIMARY KEY ("menuItemId","ingredientId")
);

-- AddForeignKey
ALTER TABLE "IngreidentOnItem" ADD CONSTRAINT "IngreidentOnItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngreidentOnItem" ADD CONSTRAINT "IngreidentOnItem_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
