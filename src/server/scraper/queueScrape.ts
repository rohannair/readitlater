import { toMarkdown } from '@/lib/markdown/toMarkdown'
import { scrapeWebsite } from '@/workers/scrape-website'
import * as cheerio from 'cheerio'
import sanitizeHtml from 'sanitize-html'

interface QueueScrape {
  url: string
}

function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString)
    return true
  } catch (_) {
    return false
  }
}

export async function queueScrape(input: QueueScrape) {
  try {
    if (!isValidUrl(input.url)) {
      throw new Error('Invalid URL')
    }

    scrapeWebsite.trigger({ url: input.url })

    return {
      message: 'Scrape queued',
    }
  } catch (err) {
    console.error(err)
    throw new Error('Failed to queue scrape')
  }
}
