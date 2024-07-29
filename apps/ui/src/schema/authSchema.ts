import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

export type AuthParams = z.infer<typeof authSchema>
