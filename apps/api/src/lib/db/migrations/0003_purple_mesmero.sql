ALTER TABLE "links" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "links" ADD COLUMN "image_url" varchar(255);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_name_idx" ON "categories" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_slug_idx" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "link_title_idx" ON "links" USING btree ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tag_name_idx" ON "tags" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_email_idx" ON "users" USING btree ("email");