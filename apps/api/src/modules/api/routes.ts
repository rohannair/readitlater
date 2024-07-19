import { verifySession } from '@/_middleware/verifySession'
import type { Env } from '@/types'
import { OpenAPIHono as Hono } from '@hono/zod-openapi'
import { getLinksByUser, queueScrape } from './handlers'
import { getCookie } from 'hono/cookie'

export const apiRouter = new Hono<Env>()
  .use('*', verifySession)
  .get('/api/protectedRoute', async (c) => {
    const sessionToken = getCookie(c)
    console.log('Session token:', sessionToken)
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
  .get('/api/v1/links/status', async (c) => {
    return c.json({ message: 'Status' })
  })
