import type { AppType } from '@readitlater/api/src/app'
import { hc } from 'hono/client'

export const client = hc<AppType>('http://localhost:3001/', {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: 'include' as RequestCredentials,
    }),
  headers: {
    'Content-Type': 'application/json',
  },
})
