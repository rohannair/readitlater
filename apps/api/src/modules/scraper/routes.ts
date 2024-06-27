import { verifySession } from '@/_middleware/verifySession'
import type { Env } from '@/types'
import { OpenAPIHono as Hono } from '@hono/zod-openapi'
import { queueScrape, getLinksByUser } from './handlers'

export const apiRouter = new Hono<Env>()
  .use(verifySession)
  .route('/', queueScrape)
  .route('/', getLinksByUser)
  .get('/url/status', async (c) => {
    return c.json({ message: 'Status' })
  })
