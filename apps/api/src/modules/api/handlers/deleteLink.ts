import { linkRepository } from '@/lib/db/repositories/links.repository'
import type { Env } from '@/types'
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'

export const deleteLink = new OpenAPIHono<Env>().openapi(
  createRoute({
    method: 'delete',
    path: '/:id',
    request: {
      params: z.object({
        id: z.string(),
      }),
    },
    responses: {
      204: {
        description: 'Link deleted',
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

    await linkRepository.deleteForUser({
      linkId: id,
      userId: c.var.user.id,
    })

    return c.json(null, 204)
  },
)
