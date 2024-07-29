import { categories, linksTags, linksUsers } from '@/lib/db/schema'
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
  title: varchar('title', {
    length: 255,
  }),
  status: varchar('status', {
    enum: ['submitted', 'processing', 'completed', 'error'],
  })
    .default('submitted')
    .notNull(),
  statusReason: text('status_reason'),
  cleaned: text('cleaned'),
  summary: text('summary'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const linksRelations = relations(links, ({ many }) => ({
  users: many(linksUsers),
  categories: many(categories),
  tags: many(linksTags),
}))

export const insertLinkSchema = createInsertSchema(links)
export const selectLinkSchema = createSelectSchema(links)
export type Link = z.infer<typeof selectLinkSchema>
