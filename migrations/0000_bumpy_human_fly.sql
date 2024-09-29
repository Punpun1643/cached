DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('read', 'pending', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "urls" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"status" "status" NOT NULL,
	"tag" varchar(128),
	"address" text NOT NULL,
	"date_added" timestamp DEFAULT now() NOT NULL
);
