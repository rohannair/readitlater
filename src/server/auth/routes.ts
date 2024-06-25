import { OpenAPIHono as Hono } from '@hono/zod-openapi'
import { login, logout, getMe, register } from './handlers'
import type { Env } from '@/server/types'

const authRouter = new Hono<Env>()
  .route('/', login)
  .route('/', logout)
  .route('/', getMe)
  .route('/', register)

export default authRouter
