import { linksUsers } from '@/lib/db/schema/linksUsers'
import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const links = pgTable('links', {
  id: varchar('id', {
    length: 255,
  }).primaryKey(),
  url: varchar('url', {
    length: 255,
  }).unique(),
  summary: text('summary'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const linksRelations = relations(links, ({ many }) => ({
  users: many(linksUsers),
}))

export const insertLinkSchema = createInsertSchema(links)
export const selectLinkSchema = createSelectSchema(links)
export type Link = z.infer<typeof selectLinkSchema>
