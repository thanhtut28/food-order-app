/*
  Warnings:

  - You are about to drop the column `productId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IngredientType" AS ENUM ('MAIN', 'SIDE');

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_productId_fkey";

-- DropIndex
DROP INDEX "Category_productId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "quantity",
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "type" "IngredientType" NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IngredientToMenuItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToMenuItem_AB_unique" ON "_IngredientToMenuItem"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToMenuItem_B_index" ON "_IngredientToMenuItem"("B");

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToMenuItem" ADD CONSTRAINT "_IngredientToMenuItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToMenuItem" ADD CONSTRAINT "_IngredientToMenuItem_B_fkey" FOREIGN KEY ("B") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
