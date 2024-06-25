import { links } from '@/server/db/schema/links'
import { users } from '@/server/db/schema/users'
import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const linksUsers = pgTable(
  'links_users',
  {
    linkId: varchar('link_id')
      .notNull()
      .references(() => links.id),
    userId: varchar('user_id')
      .notNull()
      .references(() => users.id),
    role: varchar('role', {
      length: 255,
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
}))

export const insertLinksUsersSchema = createInsertSchema(linksUsers)
export const selectLinksUsersSchema = createSelectSchema(linksUsers)
export type LinkUser = z.infer<typeof selectLinksUsersSchema>
