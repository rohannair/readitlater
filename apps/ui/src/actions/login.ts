'use server'

import { createServerApiClient } from '@/lib/api/serverClient'
import { authSchema, type AuthParams } from '@/schema/authSchema'

export async function login({ email, password }: AuthParams) {
  const json = authSchema.safeParse({ email, password })
  if (!json.success) {
    throw new Error('Invalid email or password')
  }

  const client = await createServerApiClient()
  const res = await client.auth.login.$post({
    json,
  })

  if (!res.ok) {
    throw new Error('Invalid email or password')
  }

  return await res.json()
}
