-- This is an empty migration.-- Enable Row Level Security
ALTER TABLE "Post" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Schedule" ENABLE ROW LEVEL SECURITY;

-- Force Row Level Security for table owners
ALTER TABLE "Post" FORCE ROW LEVEL SECURITY;
ALTER TABLE "Schedule" FORCE ROW LEVEL SECURITY;
