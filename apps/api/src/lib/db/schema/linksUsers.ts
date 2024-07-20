import { categories } from '@/lib/db/schema/categories'
import { links } from '@/lib/db/schema/links'
import { users } from '@/lib/db/schema/users'
import { relations } from 'drizzle-orm'
import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const linksUsers = pgTable(
  'links_users',
  {
    linkId: varchar('link_id').notNull(),
    userId: varchar('user_id').notNull(),
    categoryId: integer('category_id'),
    role: varchar('role', {
      length: 255,
      enum: ['reader', 'submitter'],
    }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.linkId, t.userId] }),
  }),
)

export const linksUsersRelations = relations(linksUsers, ({ one }) => ({
  link: one(links, {
    fields: [linksUsers.linkId],
    references: [links.id],
  }),
  user: one(users, {
    fields: [linksUsers.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [linksUsers.categoryId],
    references: [categories.id],
  }),
}))

export const insertLinksUsersSchema = createInsertSchema(linksUsers)
export const selectLinksUsersSchema = createSelectSchema(linksUsers)
export type LinkUser = z.infer<typeof selectLinksUsersSchema>
