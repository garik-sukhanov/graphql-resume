/*
  Warnings:

  - You are about to drop the column `description` on the `experience` table. All the data in the column will be lost.
  - The `end` column on the `experience` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `start` on the `experience` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "experience" DROP COLUMN "description",
ADD COLUMN     "achievements" TEXT[],
DROP COLUMN "start",
ADD COLUMN     "start" DATE NOT NULL,
DROP COLUMN "end",
ADD COLUMN     "end" DATE;
