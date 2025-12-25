CREATE TABLE "ad_tokens" (
	"token" varchar(255) PRIMARY KEY NOT NULL,
	"user_key" varchar(255) NOT NULL,
	"used" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "dictionary" (
	"id" serial PRIMARY KEY NOT NULL,
	"symbol" varchar(255) NOT NULL,
	"meaning" varchar(255) NOT NULL,
	"category" varchar(255) NOT NULL,
	"emoji" varchar(20) NOT NULL,
	"short_description" varchar(1000),
	"description" text NOT NULL,
	"psychological_meaning" text,
	"islamic_meaning" text,
	"positive_effects" jsonb DEFAULT '[]'::jsonb,
	"negative_effects" jsonb DEFAULT '[]'::jsonb,
	"emotion_levels" jsonb DEFAULT '{"fear":0,"intuition":0,"confusion":0,"power":0}'::jsonb,
	"daily_prediction" text,
	"social_effects" jsonb DEFAULT '[]'::jsonb,
	"emotional_effects" jsonb DEFAULT '[]'::jsonb,
	"health_effects" jsonb DEFAULT '[]'::jsonb,
	"financial_signs" jsonb DEFAULT '[]'::jsonb,
	"spiritual_comment" text,
	"luck_score" varchar(10),
	"realization_rate" varchar(10)
);
--> statement-breakpoint
CREATE TABLE "dream_usage" (
	"user_key" varchar(255) PRIMARY KEY NOT NULL,
	"daily_count" integer DEFAULT 0 NOT NULL,
	"last_date" date NOT NULL
);
