ALTER TABLE "urls" ALTER COLUMN "date_added" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "urls" ALTER COLUMN "date_added" SET DEFAULT now();