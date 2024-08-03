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

  const cookieOptions = getCookieValue(res.headers, 'set-cookie')
  cookies().set(cookieOptions)

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

function parseAndSetCookie(cookieString: string) {
  // Split the cookie string into individual parts
  const parts = cookieString.split(';').map((part) => part.trim())

  // Initialize an object to store cookie options
  const cookieOptions: {
    name: string
    value: string
    maxAge?: number
    path?: string
    httpOnly?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
  } = {
    name: '',
    value: '',
  }

  // Parse each part of the cookie string
  for (const part of parts) {
    if (part.includes('=')) {
      const [key, value] = part.split('=')
      if (!cookieOptions.name) {
        cookieOptions.name = key
        cookieOptions.value = value
      } else if (key.toLowerCase() === 'max-age') {
        cookieOptions.maxAge = Number.parseInt(value)
      } else if (key.toLowerCase() === 'path') {
        cookieOptions.path = value
      } else if (key.toLowerCase() === 'samesite') {
        cookieOptions.sameSite = value.toLowerCase() as
          | 'strict'
          | 'lax'
          | 'none'
      }
    } else if (part.toLowerCase() === 'httponly') {
      cookieOptions.httpOnly = true
    }
  }

  return cookieOptions
}

function getCookieValue(headers: Headers, key: string) {
  return parseAndSetCookie(extractheaders(headers)[key])
}
