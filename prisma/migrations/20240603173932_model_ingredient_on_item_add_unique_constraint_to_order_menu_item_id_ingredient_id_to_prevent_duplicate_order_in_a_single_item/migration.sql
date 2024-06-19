/*
  Warnings:

  - A unique constraint covering the columns `[order,menuItemId,ingredientId]` on the table `IngreidentOnItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "IngreidentOnItem_order_menuItemId_ingredientId_key" ON "IngreidentOnItem"("order", "menuItemId", "ingredientId");
