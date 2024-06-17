import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'
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

export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
