import type { Env } from '@/types/common'
import { Hono } from 'hono'
import { showRoutes } from 'hono/dev'
import { logger } from 'hono/logger'
import { authRouter } from './auth'
import { apiRouter } from './scraper'

export const app = new Hono<Env>()
  .basePath('/api')
  .use(logger())
  .get('/', (c) => c.text('Hello World!'))
  .get('/health', (c) =>
    c.json({ message: 'Healthy', uptime: process.uptime() }),
  )
  .route('/auth', authRouter)
  .route('/v1', apiRouter)

showRoutes(app)

// for RPC
export type AppType = typeof app
