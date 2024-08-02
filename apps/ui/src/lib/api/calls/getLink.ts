'use server'

import { createServerApiClient } from '@/lib/api/serverClient'

export async function getLink({ id }: { id: string }) {
  const client = await createServerApiClient()
  const response = await client.api.v1.links[':id'].$get({
    param: {
      id,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch link')
  }
  return await response.json()
}
