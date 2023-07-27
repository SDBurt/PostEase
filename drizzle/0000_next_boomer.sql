DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('draft', 'scheduled', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linkedin_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer NOT NULL,
	"user_id" text DEFAULT 'requesting_user_id()' NOT NULL,
	"linkedin_post_id" integer,
	"text" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text DEFAULT 'requesting_user_id()' NOT NULL,
	"title" varchar(256),
	"text" text NOT NULL,
	"status" "status" DEFAULT 'draft' NOT NULL,
	"scheduled_at" timestamp,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schedules" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer NOT NULL,
	"user_id" text DEFAULT 'requesting_user_id()' NOT NULL,
	"recurring" boolean,
	"frequency" text,
	"next_occurence" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_schedules" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text DEFAULT 'requesting_user_id()' NOT NULL,
	"schedule" json DEFAULT '{"schedule":[]}'::json,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "twitter_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer NOT NULL,
	"user_id" text DEFAULT 'requesting_user_id()' NOT NULL,
	"tweet_id" integer,
	"text" varchar(280) NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
