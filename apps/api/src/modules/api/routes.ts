import { verifySession } from '@/_middleware/verifySession'
import type { Env } from '@/types'
import { OpenAPIHono as Hono } from '@hono/zod-openapi'
import { getCookie } from 'hono/cookie'
import { logger } from 'hono/logger'
import { deleteLink, getLink, getLinksByUser, queueScrape } from './handlers'

export const apiRouter = new Hono<Env>()
  .use(logger())
  .use('*', verifySession)
  .get('/api/protectedRoute', async (c) => {
    const sessionToken = getCookie(c)
    if (!sessionToken) {
      return c.json({ message: 'Unauthorized' }, 401)
    }
    // Verify the session token here
    // If valid, return some data
    return c.json({
      message: 'You are authenticated!',
      data: 'Some protected data',
    })
  })
  .route('/api/v1/links', queueScrape)
  .route('/api/v1/links', getLinksByUser)
  .route('/api/v1/links', getLink)
  .route('/api/v1/links', deleteLink)
  .get('/api/v1/links/status', async (c) => {
    return c.json({ message: 'Status' })
  })

apiRouter.onError((err, c) => {
  console.error('Error in API:', err)
  return c.json({ message: 'Internal server error' }, 500)
})
