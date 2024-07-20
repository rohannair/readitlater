import { createLinkRepository } from '@/lib/db/repositories/links.repository'
import type { Env } from '@/types'
import { scrapeWebsite } from '@/workers/scrape-website'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

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
  async (c) => {
    const { url } = c.req.valid('json')

    if (!c.var.user?.id) {
      return c.json({ message: 'Not logged in' }, 401)
    }

    if (checkDenyList(url)) {
      return c.json({ message: 'This site is not yet supported' }, 400)
    }

    const link = await createLinkRepository().createLink({
      url,
      userId: c.var.user?.id,
    })

    if (!link?.id) {
      return c.json({ message: 'Something went wrong' }, 400)
    }

    if (!link.summary) {
      const handle = await scrapeWebsite.trigger({
        url: url,
        link: link.id,
      })

      return c.json({ message: 'Queued', handle }, 200)
    }

    return c.json({ message: 'Link exists' }, 200)
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
