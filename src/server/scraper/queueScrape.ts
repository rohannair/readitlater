import { toMarkdown } from '@/lib/markdown/toMarkdown'
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

    const resp = await fetch(input.url, {
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
      id: 'fake-id',
      url: input.url,
      markdown: markdown.replace(/\\n/g, '\n'),
    }
  } catch (err) {
    console.error(err)
    throw new Error('Failed to queue scrape')
  }
}
