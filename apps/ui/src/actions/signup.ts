'use server'

import { createServerApiClient } from '@/lib/api/serverClient'
import { authSchema, type AuthParams } from '@/schema/authSchema'

export async function signup({ email, password }: AuthParams) {
  const json = authSchema.safeParse({ email, password })
  if (!json.success) {
    throw new Error('Invalid email or password')
  }

  const client = await createServerApiClient()
  const res = await client.auth.register.$post({
    json,
  })

  if (!res.ok) {
    throw new Error('Invalid email or password')
  }

  return await res.json()
}
