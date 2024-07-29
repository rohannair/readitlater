import { db } from '@/lib/db'
import {
  createLinkRepository,
  linkRepository,
} from '@/lib/db/repositories/links.repository'
import { fetchSite } from '@/lib/scraper'
import { getSummary } from '@/workers/get-summary'
import { task } from '@trigger.dev/sdk/v3'

interface ScrapeWebsiteParams {
  url: string
  link: string
}

export async function scrape({ url, link }: ScrapeWebsiteParams) {
  const linkRepository = await createLinkRepository(db)

  const {
    data: { title, content: body },
  } = await fetchSite(url)

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
}

const handleError = async (payload: any, error: unknown) => {
  const reason = error instanceof Error ? error.message : 'Unknown error'

  await linkRepository.updateLink({
    id: payload.link,
    status: 'error',
    statusReason: reason,
  })

  return {
    skipRetrying: true,
  }
}

export const scrapeWebsite = task({
  id: 'scrape-website',
  run: scrape,
  handleError,
  queue: {
    concurrencyLimit: 3,
  },
})
