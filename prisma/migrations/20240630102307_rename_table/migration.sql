/*
  Warnings:

  - You are about to drop the `IngredientItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IngredientItem" DROP CONSTRAINT "IngreidentItem_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientItem" DROP CONSTRAINT "IngreidentItem_menuItemId_fkey";

-- DropTable
DROP TABLE "IngredientItem";

-- CreateTable
CREATE TABLE "IngreidentItem" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "menuItemId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "IngreidentItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IngreidentItem_order_menuItemId_key" ON "IngreidentItem"("order", "menuItemId");

-- AddForeignKey
ALTER TABLE "IngreidentItem" ADD CONSTRAINT "IngreidentItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngreidentItem" ADD CONSTRAINT "IngreidentItem_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
