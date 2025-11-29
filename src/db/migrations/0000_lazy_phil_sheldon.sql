CREATE TABLE "dictionary" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"emoji" varchar(20) NOT NULL,
	"meaning" varchar(255) NOT NULL,
	"symbol" varchar(255) NOT NULL
);
