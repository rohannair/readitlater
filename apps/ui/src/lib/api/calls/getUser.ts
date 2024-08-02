'use server'

import { client } from '../client'

export async function getUser() {
  const response = await client.auth.me.$get()

  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return await response.json()
}
