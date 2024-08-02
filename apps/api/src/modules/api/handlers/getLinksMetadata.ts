import { linkRepository } from '@/lib/db/repositories/links.repository'
import type { Env } from '@/types'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

export const getLinksMetadata = new OpenAPIHono<Env>().openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        description: 'Link status fetched',
        content: {
          'application/json': {
            schema: z.object({
              data: z.object({
                linksCount: z.number(),
                categoriesCount: z.number(),
                tagsCount: z.number(),
              }),
            }),
          },
        },
      },
      401: {
        description: 'Not logged in',
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
    if (!c.var.user) {
      return c.json({ message: 'Not logged in' }, 401)
    }

    const metadata = await linkRepository.getMetadata(c.var.user.id)

    return c.json({ data: metadata }, 200)
  },
)
