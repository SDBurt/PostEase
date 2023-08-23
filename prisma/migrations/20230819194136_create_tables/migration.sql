CREATE FUNCTION "public"."requesting_user_id"() RETURNS "text"
    LANGUAGE "sql" STABLE
    AS $$
  select nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::text;
$$;

ALTER FUNCTION "public"."requesting_user_id"() OWNER TO "postgres";


-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHED');

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL DEFAULT requesting_user_id(),
    "content" TEXT[],
    "status" "Status" NOT NULL DEFAULT 'DRAFT',
    "scheduledAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL DEFAULT requesting_user_id(),
    "schedule" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Schedule_userId_idx" ON "Schedule"("userId");
