import { OpenAPIHono as Hono } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import { cors } from 'hono/cors'
import { csrf } from 'hono/csrf'
import { showRoutes } from 'hono/dev'
import { logger } from 'hono/logger'
import { env } from './env'
import { client, db } from './lib/db'
import { apiRouter } from './modules/api'
import { authRouter } from './modules/auth'
import type { Env } from './types'

export const app = new Hono<Env>()
  .use(logger())
  .use(csrf())
  .use(
    cors({
      origin: (origin) => {
        const allowedOrigins = [
          'http://localhost:3000',
          'http://localhost:3001',
        ]
        return allowedOrigins.includes(origin) ? origin : null
      },
      allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
      allowHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
        'Upgrade-Insecure-Requests',
      ],
      exposeHeaders: ['Set-Cookie'],
      credentials: true,
      maxAge: 600,
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
