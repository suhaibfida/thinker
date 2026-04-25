/*
  Warnings:

  - You are about to drop the `Vectors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vectors" DROP CONSTRAINT "Vectors_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "chunks" TEXT[],
ADD COLUMN     "vectors" JSONB[];

-- DropTable
DROP TABLE "Vectors";
