CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"slug" varchar(255),
	"user_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "links_tags" (
	"link_id" varchar NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "links_tags_link_id_tag_id_pk" PRIMARY KEY("link_id", "tag_id")
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(32),
	"user_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

--> statement-breakpoint
ALTER TABLE
	"links_users" DROP CONSTRAINT "links_users_link_id_links_id_fk";

--> statement-breakpoint
ALTER TABLE
	"links_users" DROP CONSTRAINT "links_users_user_id_users_id_fk";

--> statement-breakpoint
ALTER TABLE
	"users"
ADD
	COLUMN "given_name" varchar(255);

--> statement-breakpoint
ALTER TABLE
	"users"
ADD
	COLUMN "family_name" varchar(255);

--> statement-breakpoint
ALTER TABLE
	"links"
ADD
	COLUMN "status" varchar DEFAULT 'submitted' NOT NULL;

--> statement-breakpoint
ALTER TABLE
	"links_users"
ADD
	COLUMN "category_id" integer;