import { linkRepository } from '@/lib/db/repositories/links.repository'
import type { Env } from '@/types'
import { scrapeWebsite } from '@/workers/scrape-website'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

export const queueScrape = new OpenAPIHono<Env>().openapi(
  createRoute({
    method: 'get',
    path: '/url',
    request: {
      query: z.object({
        url: z.string().url(),
      }),
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
    const { url } = c.req.valid('query')

    if (!c.var.user?.id) {
      return c.json({ message: 'Not logged in' }, 401)
    }

    const link = await linkRepository.createLink({
      url,
      userId: c.var.user?.id,
    })

    if (!link?.id) {
      return c.json({ message: 'Link already exists' }, 400)
    }

    const handle = await scrapeWebsite.trigger({
      url: url,
      link: link.id,
    })

    return c.json({ message: 'Queued', handle }, 200)
  },
)
