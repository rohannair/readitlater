import { env } from '@/env'

export async function fetchSite(url: string) {
  try {
    const resp = await fetch(`https://r.jina.ai/${url}`, {
      headers: {
        Authorization: `Bearer ${env.JINA_API_KEY}`,
        Accept: 'application/json',
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
