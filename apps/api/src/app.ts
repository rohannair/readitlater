import { OpenAPIHono as Hono } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import { cors } from 'hono/cors'
import { showRoutes } from 'hono/dev'
import { logger } from 'hono/logger'
import { env } from './env'
import { authRouter } from './modules/auth'
import { apiRouter } from './modules/api'
import type { Env } from './types'

export const app = new Hono<Env>()
  .use(logger())
  .use(
    cors({
      origin: '*',
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      exposeHeaders: ['Set-Cookie'],
      credentials: true,
    }),
  )
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

app.notFound((c) => c.json({ message: 'Not found' }, 404))
app.onError((err, c) => {
  console.error(err)
  return c.json({ message: 'Internal server error' }, 500)
})

const routes = app.route('/auth', authRouter).route('/', apiRouter)

// for RPC
export type AppType = typeof routes

if (env.NODE_ENV === 'development') {
  showRoutes(routes)
}
