'use server'

import { client } from '@/lib/api/client'
import { setAuthCookie } from '@/lib/cookie'

export async function createUser(json: {
  email: string
  password: string
}) {
  const res = await client.auth.register.$post({
    json,
  })

  if (!res.ok) {
    return {
      status: 'error',
      data: await res.json(),
    }
  }

  setAuthCookie(res.headers.get('Auth_session') as string)

  return await res.json()
}
