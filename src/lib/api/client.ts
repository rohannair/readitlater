import type { AppType } from '@/lib/server'
import { hc } from 'hono/client'

export const client = hc<AppType>('/api')

async function hi() {
  const res = await client.users.$get()
}
