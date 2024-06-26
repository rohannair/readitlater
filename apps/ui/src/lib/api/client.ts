import type { AppType } from '@readitlater/api/src/app'
import { hc } from 'hono/client'
import { cookies } from 'next/headers'

const token = cookies().get('Auth_session')

export const client = hc<AppType>('http://localhost:3000/api/', {
  headers: {
    'Content-Type': 'application/json',
    ...(token?.value && { Authorization: `Bearer ${token.value}` }), // Conditionally add Authorization header
  },
})
