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
        page: z.preprocess(
          (a) => Number.parseInt(a as string, 10),
          z.number().int().min(1),
        ),
        pageSize: z.preprocess(
          (a) => Number.parseInt(a as string, 10),
          z.number().int().min(1),
        ),
      }),
    },
    responses: {
      200: {
        description: 'Links fetched',
        content: {
          'application/json': {
            schema: z.object({
              links: z.array(selectLinkSchema).nullable(),
              pagination: z.object({
                page: z.number().int().min(1),
                pageSize: z.number().int().min(1),
                totalCount: z.number().int().min(0),
                totalPages: z.number().int().min(0),
              }),
            }),
          },
        },
      },
    },
  }),
  // @ts-expect-error
  async (c) => {
    const { page = 1, pageSize = 10 } = c.req.valid('query')

    if (!c.var.user)
      return c.json(
        {
          links: [],
          pagination: {
            page,
            pageSize,
            totalCount: 0,
            totalPages: 0,
          },
        },
        200,
      )

    const { links, pagination } = await linkRepository.getAllForUser(
      c.var.user?.id,
      page,
      pageSize,
    )

    return c.json({ links, pagination }, 200)
  },
)
