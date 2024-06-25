import type { Env } from '@/server/types'
import { OpenAPIHono as Hono } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import { showRoutes } from 'hono/dev'
import { logger } from 'hono/logger'
import { authRouter } from './auth'
import { apiRouter } from './scraper'
import { env } from '@/env'

export const app = new Hono<Env>()
  // .basePath('/api')
  .use(logger())
  .get('/', (c) => c.text('Hello World!'))
  .get('/health', (c) =>
    c.json({ message: 'Healthy', uptime: process.uptime() }),
  )

// @ts-expect-error
app.doc('/api/swagger.json', {
  openapi: '3.1.0',
  info: { title: 'Read it later', version: '1.0.0' },
})

app.get(
  '/api/scalar',
  apiReference({
    spec: {
      url: '/api/swagger.json',
    },
  }),
)

const routes = app.route('/auth', authRouter).route('/v1', apiRouter)

// for RPC
export type AppType = typeof routes

if (env.NODE_ENV === 'development') {
  showRoutes(routes)
}
