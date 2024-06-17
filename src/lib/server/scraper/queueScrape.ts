import * as cheerio from 'cheerio'

interface QueueScrape {
  url: string
}

export async function queueScrape(input: QueueScrape) {
  const resp = await fetch(input.url)

  if (!resp.ok) {
    throw new Error('Failed to fetch')
  }

  const body = await resp.json()
  const html = cheerio.load(body)

  return { id: 'fake-id', url: input.url, html }
}
