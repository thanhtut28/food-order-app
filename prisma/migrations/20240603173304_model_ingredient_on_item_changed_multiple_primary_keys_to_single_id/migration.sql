/*
  Warnings:

  - The primary key for the `IngreidentOnItem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "IngreidentOnItem" DROP CONSTRAINT "IngreidentOnItem_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "IngreidentOnItem_pkey" PRIMARY KEY ("id");
