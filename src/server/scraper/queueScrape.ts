import { scrapeWebsite } from '@/workers/scrape-website'

export async function queueScrape(input: {
  url: string
  link: string
}) {
  const handle = await scrapeWebsite.trigger({
    url: input.url,
    link: input.link,
  })

  return {
    message: 'Scrape queued',
    handle,
  }
}
