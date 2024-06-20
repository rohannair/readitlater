import { toMarkdown } from '@/lib/markdown/toMarkdown'
import { task } from '@trigger.dev/sdk/v3'
import * as cheerio from 'cheerio'
import sanitizeHtml from 'sanitize-html'

interface ScrapeWebsiteParams {
  url: string
}

export const scrapeWebsite = task({
  id: 'scrape-website',
  run: scrape,
  queue: {
    concurrencyLimit: 3,
  },
})

export async function scrape({ url }: ScrapeWebsiteParams) {
  const resp = await fetch(url, {
    headers: { contentType: 'text/html' },
  })

  if (!resp.ok) {
    throw new Error('Failed to fetch')
  }

  const body = await resp.text()
  const $ = cheerio.load(body)

  // Extract the main content (this can be adapted based on the structure of the target websites)
  const mainContent = $('main').length ? $('main').html() : $('body').html()

  if (!mainContent) {
    throw new Error('No main content found')
  }

  // Sanitize HTML
  const cleanHtml = sanitizeHtml(mainContent, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src', 'alt'],
    },
  })

  const markdown = toMarkdown(cleanHtml)

  return {
    url,
    markdown: markdown.replace(/\\n/g, '\n'),
  }
}
