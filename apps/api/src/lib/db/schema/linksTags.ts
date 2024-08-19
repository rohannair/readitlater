import { links } from '@/lib/db/schema/links'
import { tags } from '@/lib/db/schema/tags'
import { relations } from 'drizzle-orm'
import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const linksTags = pgTable(
  'links_tags',
  {
    linkId: varchar('link_id').notNull(),
    tagId: integer('tag_id').notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.linkId, t.tagId] }),
  }),
)

export const linksTagsRelations = relations(linksTags, ({ one }) => ({
  link: one(links, {
    fields: [linksTags.linkId],
    references: [links.id],
  }),
  tag: one(tags, {
    fields: [linksTags.tagId],
    references: [tags.id],
  }),
}))

export const insertLinksTagsSchema = createInsertSchema(linksTags)
export const selectLinksTagsSchema = createSelectSchema(linksTags)
export type LinkTag = z.infer<typeof selectLinksTagsSchema>
export type NewLinkTag = z.infer<typeof insertLinksTagsSchema>
