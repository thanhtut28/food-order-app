/*
  Warnings:

  - You are about to drop the column `type` on the `Ingredient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "type";

-- DropEnum
DROP TYPE "IngredientType";
