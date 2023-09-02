-- DropIndex
DROP INDEX "Schedule_userId_key";

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'America/Vancouver',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'new Schedule',
ALTER COLUMN "schedule" SET DEFAULT '[]';
