/*
  Warnings:

  - The `chunks` column on the `Vectors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `vector` column on the `Vectors` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Vectors" DROP COLUMN "chunks",
ADD COLUMN     "chunks" TEXT[],
DROP COLUMN "vector",
ADD COLUMN     "vector" JSONB[];
