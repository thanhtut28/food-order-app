/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `_CartToMenuItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MenuItemToOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CartToMenuItem" DROP CONSTRAINT "_CartToMenuItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToMenuItem" DROP CONSTRAINT "_CartToMenuItem_B_fkey";

-- DropForeignKey
ALTER TABLE "_MenuItemToOrder" DROP CONSTRAINT "_MenuItemToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_MenuItemToOrder" DROP CONSTRAINT "_MenuItemToOrder_B_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalPrice",
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "_CartToMenuItem";

-- DropTable
DROP TABLE "_MenuItemToOrder";

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "menuItemId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
