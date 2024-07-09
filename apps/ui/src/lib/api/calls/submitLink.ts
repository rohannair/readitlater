'use server'

import { client } from '@/lib/api/client'

export async function submitLink(json: {
  url: string
}) {
  const res = await client.links.$post({
    json,
  })

  if (!res.ok) {
    return {
      status: 'error',
      data: await res.json(),
    }
  }

  return await res.json()
}
