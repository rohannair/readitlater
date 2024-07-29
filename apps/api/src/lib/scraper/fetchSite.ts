import { env } from '@/env'

export async function fetchSite(url: string) {
  try {
    const resp = await fetch(`https://r.jin.ai/${url}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${env.JINA_API_KEY}`,
      },
    })

    if (!resp.ok) {
      throw new Error('Failed to fetch')
    }

    return await resp.json()
  } catch (e) {
    if (e instanceof Error) {
      throw e
    }
    throw new Error('Failed to fetch')
  }
}
