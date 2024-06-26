import { linkRepository } from '@/lib/db/repositories/links.repository'
import { selectLinkSchema } from '@/lib/db/schema'
import type { Env } from '@/types'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

export const getLinksByUser = new OpenAPIHono<Env>().openapi(
  createRoute({
    method: 'get',
    path: '/links',
    request: {
      query: z.object({
        offset: z.number().int().optional(),
        limit: z.number().int().optional(),
      }),
    },
    responses: {
      200: {
        description: 'Links fetched',
        content: {
          'application/json': {
            schema: z.object({
              links: z.array(selectLinkSchema),
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
    // const { offset = 0, limit = 10 } = c.req.valid('query')

    if (!c.var.user) return c.json({ message: 'Not logged in' }, 401)

    const links = await linkRepository.getAllForUser(c.var.user?.id)

    return c.json({ links }, 200)
  },
)
