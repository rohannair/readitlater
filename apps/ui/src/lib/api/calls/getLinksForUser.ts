// 'use server'

import { client } from '../client'

export async function getLinksForUser() {
  try {
    const response = await client.links.$get({
      query: {
        page: '1',
        pageSize: '10',
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch links:', response)
      throw new Error('Failed to fetch links')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching links:', error)
    throw error
  }
}
