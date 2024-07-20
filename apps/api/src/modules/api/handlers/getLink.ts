import { selectLinkSchema } from '@/lib/db'
import { linkRepository } from '@/lib/db/repositories/links.repository'
import type { Env } from '@/types'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

export const getLink = new OpenAPIHono<Env>().openapi(
  createRoute({
    method: 'get',
    path: '/:id',
    request: {
      params: z.object({
        id: z.string(),
      }),
    },
    responses: {
      200: {
        description: 'Link fetched',
        content: {
          'application/json': {
            schema: selectLinkSchema,
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
      404: {
        description: 'Link not found',
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
  // @ts-expect-error
  async (c) => {
    const { id } = c.req.valid('param')

    if (!c.var.user) {
      return c.json({ message: 'Not logged in' }, 401)
    }

    const link = await linkRepository.getById({
      linkId: id,
      userId: c.var.user.id,
    })

    if (!link) {
      return c.json({ message: 'Link not found' }, 404)
    }

    return c.json({ link })
  },
)
