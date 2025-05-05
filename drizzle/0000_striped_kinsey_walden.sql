CREATE TABLE "monarchs" (
	"id" serial PRIMARY KEY NOT NULL,
	"birth_name" text NOT NULL,
	"regnal_name" text NOT NULL,
	"first_name" text NOT NULL,
	"regnal" text,
	"house" text NOT NULL,
	"birth_year" integer NOT NULL,
	"death_year" integer NOT NULL,
	"reign_start" integer NOT NULL,
	"reign_end" integer NOT NULL,
	"birth_place" text NOT NULL,
	"religion" text NOT NULL,
	"burial_place" text NOT NULL,
	"image_url" text NOT NULL,
	"bio" text NOT NULL
);
