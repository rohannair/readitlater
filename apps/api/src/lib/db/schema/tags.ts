import { linksTags, users } from '@/lib/db/schema'
import { relations } from 'drizzle-orm'
import { index, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const tags = pgTable(
  'tags',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', {
      length: 32,
    }),
    userId: varchar('user_id'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => ({
    tagNameIdx: index('tag_name_idx').on(t.name),
  }),
)

export const tagRelations = relations(tags, ({ one, many }) => ({
  user: one(users, {
    fields: [tags.userId],
    references: [users.id],
  }),
  links: many(linksTags),
}))

export const insertTagSchema = createInsertSchema(tags)
export const selectTagSchema = createSelectSchema(tags)

export type Tag = z.infer<typeof selectTagSchema>
export type NewTag = z.infer<typeof insertTagSchema>
