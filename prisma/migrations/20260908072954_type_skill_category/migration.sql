/*
  Warnings:

  - Changed the type of `category` on the `skill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('LANGUAGE', 'FRAMEWORK', 'DATABASE', 'TOOL');

-- AlterTable
ALTER TABLE "skill" DROP COLUMN "category",
ADD COLUMN     "category" "SkillCategory" NOT NULL;
