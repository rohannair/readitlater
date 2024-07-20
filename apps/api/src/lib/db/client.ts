import { env } from '@/env'
import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

declare global {
  var db: NodePgDatabase
}

export const client = new Client({
  connectionString: env.DB_URL,
})

await client.connect()
// biome-ignore lint/suspicious/noRedeclare: not a redeclaration
export const db = drizzle(client)
if (!globalThis.db) {
  globalThis.db = db
}
