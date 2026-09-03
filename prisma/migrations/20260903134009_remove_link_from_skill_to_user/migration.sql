/*
  Warnings:

  - You are about to drop the column `userId` on the `skills` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_userId_fkey";

-- AlterTable
ALTER TABLE "skills" DROP COLUMN "userId";
