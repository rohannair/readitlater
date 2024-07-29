'use server'

import { createServerApiClient } from '@/lib/api/serverClient'

export async function createUrl(json: {
  url: string
}) {
  const client = await createServerApiClient()
  const res = await client.api.v1.links.$post({
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
