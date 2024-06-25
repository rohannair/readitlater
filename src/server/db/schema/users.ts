import { linksUsers } from '@/server/db/schema/linksUsers'
import { relations } from 'drizzle-orm'
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

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
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  links: many(linksUsers),
}))

export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
