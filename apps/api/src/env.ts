import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    PORT: z.string().default('3000'),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    DB_URL: z.string().min(1),
    ENABLE_SQL_LOGGING: z.boolean().default(false),
    JINA_API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {},
})
