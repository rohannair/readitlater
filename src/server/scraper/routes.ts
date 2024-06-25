import { verifySession } from '@/server/_middleware/verifySession'
import type { Env } from '@/server/types'
import { OpenAPIHono as Hono } from '@hono/zod-openapi'
import { queueScrape } from './handlers'

export const apiRouter = new Hono<Env>()
  .use(verifySession)
  .route('/', queueScrape)
  .get('/url/status', async (c) => {
    return c.json({ message: 'Status' })
  })
