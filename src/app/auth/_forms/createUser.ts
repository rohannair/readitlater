import type { AppType } from '@/lib/server'
import { hc } from 'hono/client'

export const client = hc<AppType>('/')

export const createUser = async (params: {
  email: string
  password: string
}) => {
  // @ts-ignore
  const res = await client.users.$post({
    body: params,
  })

  if (!res.ok) {
    return {
      status: 'error',
      data: await res.json(),
    }
  }

  return await res.json()
}
