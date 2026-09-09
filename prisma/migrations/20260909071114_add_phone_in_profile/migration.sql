-- AlterTable
ALTER TABLE "Profiles" ADD COLUMN     "phone" VARCHAR(20);

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "linkGitHub" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "linkDeploy" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "link" (
    "id" UUID NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "profileId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "link" ADD CONSTRAINT "link_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
