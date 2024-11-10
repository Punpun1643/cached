ALTER TABLE "urls" ALTER COLUMN "tag" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "urls" ALTER COLUMN "tag" DROP NOT NULL;