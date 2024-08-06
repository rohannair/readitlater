DROP INDEX IF EXISTS "user_email_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_email_idx" ON "users" USING btree (lower("email"));