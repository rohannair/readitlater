import { env } from '@/env'
import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

declare global {
  var db: PostgresJsDatabase
}

export const client = postgres(env.DB_URL)

// biome-ignore lint/suspicious/noRedeclare: not a redeclaration
export const db = drizzle(client, {
  logger: false,
})
if (!globalThis.db) {
  globalThis.db = db
}
