import { links } from '@/lib/db/schema/links'
import { categories } from '@/lib/db/schema/categories'
import { relations } from 'drizzle-orm'
import { pgTable, varchar, integer, primaryKey } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const linksCategories = pgTable(
  'links_categories',
  {
    linkId: varchar('link_id').notNull(),
    categoryId: integer('category_id').notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.linkId, t.categoryId] }),
  }),
)

export const linksCategoriesRelations = relations(linksCategories, ({ one }) => ({
  link: one(links, {
    fields: [linksCategories.linkId],
    references: [links.id],
  }),
  category: one(categories, {
    fields: [linksCategories.categoryId],
    references: [categories.id],
  }),
}))

export const insertLinksCategoriesSchema = createInsertSchema(linksCategories)
export const selectLinksCategoriesSchema = createSelectSchema(linksCategories)
export type LinkCategory = z.infer<typeof selectLinksCategoriesSchema>
