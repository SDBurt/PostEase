-- -- CreateEnum
-- CREATE TYPE "Status" AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHED');

-- -- CreateTable
-- CREATE TABLE "Post" (
--     "id" SERIAL NOT NULL,
--     "userId" TEXT NOT NULL,
--     "content" TEXT NOT NULL,
--     "status" "Status" NOT NULL DEFAULT 'DRAFT',
--     "scheduledAt" TIMESTAMP(3) NOT NULL,
--     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     "updatedAt" TIMESTAMP(3) NOT NULL,

--     CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
-- );

-- Enable Row Level Security
ALTER TABLE "Post" ENABLE ROW LEVEL SECURITY;

-- Force Row Level Security for table owners
ALTER TABLE "Post" FORCE ROW LEVEL SECURITY;