import { verifySession } from '@/_middleware/verifySession'
import type { Env } from '@/types'
import { OpenAPIHono as Hono } from '@hono/zod-openapi'
import { getLinksByUser, queueScrape } from './handlers'

export const apiRouter = new Hono<Env>()
  .use(verifySession)
  .route('/api/v1/links', queueScrape)
  .route('/api/v1/links', getLinksByUser)
  .get('/api/v1/links/status', async (c) => {
    return c.json({ message: 'Status' })
  })
