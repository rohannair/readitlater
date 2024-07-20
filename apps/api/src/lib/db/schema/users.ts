import { categories, linksUsers, tags } from '@/lib/db/schema'
import { relations } from 'drizzle-orm'
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const users = pgTable('users', {
  id: varchar('id', {
    length: 255,
  }).primaryKey(),
  email: varchar('email', {
    length: 255,
  }).unique(),
  passwordHash: varchar('password_hash', {
    length: 255,
  }).notNull(),
  givenName: varchar('given_name', {
    length: 255,
  }),
  familyName: varchar('family_name', {
    length: 255,
  }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  links: many(linksUsers),
  tags: many(tags),
  categories: many(categories),
}))

export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
export type User = z.infer<typeof selectUserSchema>
