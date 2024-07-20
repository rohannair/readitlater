'use server'

import { createServerApiClient } from '@/lib/api/serverClient'

export async function getLink({ id }: { id: string }) {
  try {
    const client = await createServerApiClient()
    const response = await client.api.v1.links[':id'].$get({
      param: {
        id,
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch link:', response)
      throw new Error('Failed to fetch link')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching link:', error)
    throw error
  }
}
