/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Ingredient` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_categoryId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "categoryId",
ALTER COLUMN "type" SET DEFAULT 'MAIN';

-- CreateTable
CREATE TABLE "_CategoryToIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToIngredient_AB_unique" ON "_CategoryToIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToIngredient_B_index" ON "_CategoryToIngredient"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToIngredient" ADD CONSTRAINT "_CategoryToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToIngredient" ADD CONSTRAINT "_CategoryToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
