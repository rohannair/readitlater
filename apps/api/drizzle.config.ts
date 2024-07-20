import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  schema: './src/lib/db/schema/*',
  out: './src/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DB_URL ?? '',
    port: 6543,
  },
  verbose: true,
  strict: true,
} satisfies Config
