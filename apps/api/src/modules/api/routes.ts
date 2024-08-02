import { verifySession } from '@/_middleware/verifySession'
import type { Env } from '@/types'
import { OpenAPIHono as Hono } from '@hono/zod-openapi'
import { getCookie } from 'hono/cookie'
import { logger } from 'hono/logger'
import {
  deleteLink,
  getLink,
  getLinksByUser,
  getLinksMetadata,
  queueScrape,
} from './handlers'

export const apiRouter = new Hono<Env>()
  .use(logger())
  .use('*', verifySession)
  .route('/api/v1/links', queueScrape)
  .route('/api/v1/links/metadata', getLinksMetadata)
  .route('/api/v1/links', getLinksByUser)
  .route('/api/v1/links', getLink)
  .route('/api/v1/links', deleteLink)

apiRouter.onError((err, c) => {
  console.error('Error in API:', err)
  return c.json({ message: 'Internal server error' }, 500)
})
