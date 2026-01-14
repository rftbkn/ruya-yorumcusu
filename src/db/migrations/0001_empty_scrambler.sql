ALTER TABLE "dream_usage" ADD COLUMN "total_dreams" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "dream_usage" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "dream_usage" ADD COLUMN "updated_at" timestamp DEFAULT now();