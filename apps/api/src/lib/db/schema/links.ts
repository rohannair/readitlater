import { categories, linksTags, linksUsers } from '@/lib/db/schema'
import { relations, sql } from 'drizzle-orm'
import { index, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const links = pgTable(
  'links',
  {
    id: varchar('id', {
      length: 255,
    }).primaryKey(),
    url: varchar('url', {
      length: 255,
    })
      .unique()
      .notNull(),
    title: varchar('title', {
      length: 255,
    }),
    imageUrl: varchar('image_url', {
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
  },
  (t) => ({
    linkTitleIdx: index('link_title_idx').on(t.title),
    searchIndex: index('search_index').using(
      'gin',
      sql`(
          setweight(to_tsvector('english', ${t.title}), 'A') ||
          setweight(to_tsvector('english', ${t.cleaned}), 'B')
      )`,
    ),
  }),
)

export const linksRelations = relations(links, ({ many }) => ({
  users: many(linksUsers),
  categories: many(categories),
  tags: many(linksTags),
}))

export const insertLinkSchema = createInsertSchema(links)
export const selectLinkSchema = createSelectSchema(links)
export type Link = z.infer<typeof selectLinkSchema>
