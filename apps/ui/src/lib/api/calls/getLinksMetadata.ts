'use server'

import { createServerApiClient } from '@/lib/api/serverClient'

export async function getLinksMetadata() {
  const client = await createServerApiClient()
  const response = await client.api.v1.links.metadata.$get()

  if (!response.ok) {
    const error = await response.json()
    throw error
  }

  const { data } = await response.json()
  return data
}
