'use server'

import { client } from '../client'

export async function getUser() {
  try {
    const response = await client.auth.me.$get()

    if (!response.ok) {
      console.error('Failed to fetch user:', response)
      throw new Error('Failed to fetch user')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}
