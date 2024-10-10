ALTER TABLE "urls" ALTER COLUMN "date_added" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "urls" ALTER COLUMN "date_added" DROP DEFAULT;