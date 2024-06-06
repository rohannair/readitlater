import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.string().default('development'),
  DB_PASSWORD: z.string(),
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)
if (!parsedEnv.success) {
  const errors = Object.keys(parsedEnv.error.flatten().fieldErrors).join('\n')
  console.error(`Missing environment variables:\n${errors}`)
  process.exit(1)
}

export const env = parsedEnv.data
