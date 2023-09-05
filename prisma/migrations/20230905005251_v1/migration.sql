-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "linkedinContent" TEXT,
ADD COLUMN     "linkedin_id" TEXT,
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Untitled Post';
