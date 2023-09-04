-- CreateTable
CREATE TABLE "TwitterPost" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL DEFAULT requesting_user_id(),
    "postId" TEXT NOT NULL,
    "text" TEXT[],
    "scheduledAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "tweet_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "TwitterPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkedinPost" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL DEFAULT requesting_user_id(),
    "text" TEXT NOT NULL,
    "scheduledAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "tweet_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "LinkedinPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TwitterPost_postId_key" ON "TwitterPost"("postId");

-- CreateIndex
CREATE INDEX "TwitterPost_userId_idx" ON "TwitterPost"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LinkedinPost_postId_key" ON "LinkedinPost"("postId");

-- CreateIndex
CREATE INDEX "LinkedinPost_userId_idx" ON "LinkedinPost"("userId");

-- AddForeignKey
ALTER TABLE "TwitterPost" ADD CONSTRAINT "TwitterPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkedinPost" ADD CONSTRAINT "LinkedinPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
