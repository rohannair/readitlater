import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  API_URL: z.string().default('http://localhost:3001/'),
})

export type Env = z.infer<typeof envSchema>
export const env = envSchema.parse(process.env)
