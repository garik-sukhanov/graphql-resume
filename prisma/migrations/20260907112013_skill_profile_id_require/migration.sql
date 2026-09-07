/*
  Warnings:

  - Made the column `profileId` on table `skill` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "skill" ALTER COLUMN "profileId" SET NOT NULL;
