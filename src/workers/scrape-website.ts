import { toMarkdown } from '@/lib/markdown/toMarkdown'
import { fetchSite, getMainContent } from '@/lib/scraper'
import { sanitizeHtml } from '@/lib/url'
import { linkRepository } from '@/server/db/repositories/links.repository'
import { task } from '@trigger.dev/sdk/v3'
import * as cheerio from 'cheerio'

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
  const body = await fetchSite(url)
  const $ = cheerio.load(body)

  // Extract the main content (this can be adapted based on the structure of the target websites)
  const mainContent = getMainContent($)

  if (!mainContent) {
    throw new Error('No main content found')
  }

  await linkRepository.updateLink({
    id: link,
    body: toMarkdown(sanitizeHtml(mainContent)),
    title: $('title').text(),
    summary: $('meta[name="description"]').attr('content') ?? '',
  })
}
