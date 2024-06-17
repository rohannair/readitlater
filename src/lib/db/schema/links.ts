import { pgTable, timestamp, varchar, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

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
