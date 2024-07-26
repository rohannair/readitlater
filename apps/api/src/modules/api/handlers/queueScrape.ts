import { selectLinkSchema } from '@/lib/db'
import { createLinkRepository } from '@/lib/db/repositories/links.repository'
import type { Env } from '@/types'
import { scrapeWebsite } from '@/workers/scrape-website'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

interface ParsedScrapeResult {
  title: string
  metadata: Record<string, string>
  body: string
}

export function parseScrapeResult(text: string): ParsedScrapeResult {
  const lines = text.split('\n')
  const title = lines[0].replace('Title: ', '').trim()
  const metadata: Record<string, string> = {}
  let bodyStartIndex = 1

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (line.includes(':')) {
      const [key, value] = line.split(':').map((s) => s.trim())
      metadata[key] = value
      bodyStartIndex = i + 1
    } else {
      break
    }
  }

  const body = lines.slice(bodyStartIndex).join('\n').trim()

  return { title, metadata, body }
}

export const queueScrape = new OpenAPIHono<Env>().openapi(
  createRoute({
    method: 'post',
    path: '/',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              url: z.string().url(),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Scrape queued',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
              data: z.undefined().or(selectLinkSchema.partial()),
            }),
          },
        },
      },
      400: {
        description: 'Link exists',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
      },
    },
  }),
  // @ts-ignore
  async (c) => {
    const { url } = c.req.valid('json')

    if (!c.var.user?.id) {
      return c.json({ message: 'Not logged in' }, 401)
    }

    if (checkDenyList(url)) {
      return c.json({ message: 'This site is not yet supported' }, 400)
    }

    const links = await createLinkRepository()

    const link = await links.createLink({
      url,
      userId: c.var.user?.id,
    })

    if (!link?.id) {
      return c.json({ message: 'Something went wrong' }, 400)
    }

    if (!link.summary) {
      await scrapeWebsite.trigger({
        url: url,
        link: link.id,
      })

      return c.json({ message: 'Queued', data: { link } }, 200)
    }

    return c.json({ message: 'Link exists', data: { link } }, 200)
  },
)

function checkDenyList(url: string) {
  const denyList = [
    'twitter.com',
    'x.com',
    'facebook.com',
    'instagram.com',
    'linkedin.com',
  ]
  return denyList.some((deny) => url.includes(deny))
}
