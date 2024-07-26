import { db } from '@/lib/db'
import { createLinkRepository } from '@/lib/db/repositories/links.repository'
import { fetchSite } from '@/lib/scraper'
import * as getSummary from '@/workers/get-summary'
import { task } from '@trigger.dev/sdk/v3'

interface ScrapeWebsiteParams {
  url: string
  link: string
}

// interface ParsedScrapeResult {
//   title: string
//   metadata: Record<string, string>
//   body: string
// }

// function parseScrapeResult(text: string): ParsedScrapeResult {
//   const lines = text.split('\n')
//   const title = lines[0].replace('Title: ', '').trim()
//   const metadata: Record<string, string> = {}
//   let bodyStartIndex = 1

//   for (let i = 1; i < lines.length; i++) {
//     const line = lines[i]
//     if (line.includes(':')) {
//       const [key, value] = line.split(':').map((s) => s.trim())
//       metadata[key] = value
//       bodyStartIndex = i + 1
//     } else {
//       break
//     }
//   }

//   const body = lines.slice(bodyStartIndex).join('\n').trim()

//   return { title, metadata, body }
// }

export const scrapeWebsite = task({
  id: 'scrape-website',
  run: scrape,
  queue: {
    concurrencyLimit: 3,
  },
})

export async function scrape({ url, link }: ScrapeWebsiteParams) {
  const linkRepository = await createLinkRepository(db)
  try {
    const {
      data: { title, content: body },
    } = await fetchSite(url)

    if (!body) {
      throw new Error('No main content found')
    }

    await linkRepository.updateLink({
      id: link,
      body,
      title: title,
      status: 'processing',
    })

    await getSummary.getSummary.trigger({
      id: link,
      document: body,
    })
  } catch (error) {
    await linkRepository.updateLink({
      id: link,
      status: 'error',
    })
    throw error
  }
}
