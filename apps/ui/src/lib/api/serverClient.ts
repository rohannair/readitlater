'use server'

import { cookies } from 'next/headers'
import type { AppType } from '@readitlater/api/src/app'
import { hc } from 'hono/client'

function getAuthCookie() {
  const cookieStore = cookies()
  return cookieStore.get('auth_session')?.value
}

export async function createServerApiClient() {
  const authCookie = getAuthCookie()

  return hc<AppType>('http://localhost:3001', {
    fetch: (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers)
      if (authCookie) {
        headers.set('Cookie', `auth_session=${authCookie}`)
      }
      headers.set('Content-Type', 'application/json')

      return fetch(input, {
        ...init,
        credentials: 'include',
        headers,
      })
    },
  })
}
