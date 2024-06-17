import type { AppType } from '@/lib/server'
import { hc } from 'hono/client'

export const client = hc<AppType>('/')

export const createUser = async (params: {
  email: string
  password: string
}) => {
  // @ts-ignore
  const { data } = await client.users.$post({
    body: params,
  })
  return data
}
