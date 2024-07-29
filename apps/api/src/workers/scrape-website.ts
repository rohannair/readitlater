import { db } from '@/lib/db'
import { createLinkRepository } from '@/lib/db/repositories/links.repository'
import { fetchSite } from '@/lib/scraper'
import { getSummary } from '@/workers/get-summary'
import { task } from '@trigger.dev/sdk/v3'

interface ScrapeWebsiteParams {
  url: string
  link: string
}

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
    const { title, content: body } = await fetchSite(url)

    if (!(title && body)) {
      throw new Error('No main content found')
    }

    await linkRepository.updateLink({
      id: link,
      body,
      title,
      status: 'processing',
    })

    await getSummary.trigger({
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
