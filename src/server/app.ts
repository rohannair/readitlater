import { env } from '@/env'
import type { Env } from '@/server/types'
import { OpenAPIHono as Hono } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import { showRoutes } from 'hono/dev'
import { logger } from 'hono/logger'
import { authRouter } from './auth'
import { apiRouter } from './scraper'

export const app = new Hono<Env>()
  .use(logger())
  .get('/', (c) =>
    c.json({ message: 'Healthy', uptime: process.uptime() }, 200),
  )
  .get('/health', (c) =>
    c.json({ message: 'Healthy', uptime: process.uptime() }, 200),
  )

// @ts-expect-error
app.doc('/api/swagger.json', {
  openapi: '3.1.0',
  info: { title: 'Read it later API', version: '1.0.0' },
  servers: [{ url: 'http://localhost:3000/api' }],
})

app.get(
  '/api/docs',
  apiReference({
    spec: {
      url: '/api/swagger.json',
    },
  }),
)

const routes = app.route('/auth', authRouter).route('/', apiRouter)

// for RPC
export type AppType = typeof routes

if (env.NODE_ENV === 'development') {
  showRoutes(routes)
}
