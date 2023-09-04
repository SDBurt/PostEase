/*
  Warnings:

  - The `content` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `LinkedinPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TwitterPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LinkedinPost" DROP CONSTRAINT "LinkedinPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "TwitterPost" DROP CONSTRAINT "TwitterPost_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "linkedinContent" TEXT,
ADD COLUMN     "linkedin_id" TEXT,
DROP COLUMN "content",
ADD COLUMN     "content" TEXT[];

-- DropTable
DROP TABLE "LinkedinPost";

-- DropTable
DROP TABLE "TwitterPost";
