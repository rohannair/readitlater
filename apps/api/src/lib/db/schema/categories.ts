import { users } from '@/lib/db/schema'
import { relations } from 'drizzle-orm'
import { index } from 'drizzle-orm/pg-core'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'
import { linksCategories } from './linksCategories'

export const categories = pgTable(
  'categories',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', {
      length: 255,
    }),
    slug: varchar('slug', {
      length: 255,
    }),
    userId: varchar('user_id'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => ({
    categoryNameIdx: index('category_name_idx').on(t.name),
    categorySlugIdx: index('category_slug_idx').on(t.slug),
  }),
)

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  users: one(users, {
    fields: [categories.userId],
    references: [users.id],
  }),
  links: many(linksCategories)
}))

export const insertCategorySchema = createInsertSchema(categories)
export const selectCategorySchema = createSelectSchema(categories)
export type Category = z.infer<typeof selectCategorySchema>
export type NewCategory = z.infer<typeof insertCategorySchema>
