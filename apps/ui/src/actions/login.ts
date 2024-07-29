'use server'

import { createServerApiClient } from '@/lib/api/serverClient'
import { authSchema, type AuthParams } from '@/schema/authSchema'
import { cookies } from 'next/headers'

export async function login({ email, password }: AuthParams) {
  const json = authSchema.safeParse({ email, password })

  if (!json.success) {
    throw new Error('Invalid email or password')
  }

  const client = await createServerApiClient()
  const res = await client.auth.login.$post({
    json: json.data,
  })

  if (!res.ok) {
    console.error('Failed to login:', JSON.stringify(await res.json(), null))
    throw new Error('Invalid email or password')
  }

  const [key, value] = getCookieValue(res.headers, 'set-cookie')
  cookies().set(key, value, { path: '/' })

  return await res.json()
}

function extractheaders(headers: Headers) {
  if (!headers) return {}

  const headersObj: Record<string, string> = {}

  // @ts-expect-error: Bundling is messed up here
  for (const [key, value] of headers.entries()) {
    headersObj[key] = value
  }

  return headersObj
}

function getCookieValue(headers: Headers, key: string) {
  return extractheaders(headers)[key].split('=')
}
