/*
  Warnings:

  - A unique constraint covering the columns `[order,menuItemId]` on the table `IngreidentOnItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "IngreidentOnItem_order_menuItemId_ingredientId_key";

-- CreateIndex
CREATE UNIQUE INDEX "IngreidentOnItem_order_menuItemId_key" ON "IngreidentOnItem"("order", "menuItemId");
