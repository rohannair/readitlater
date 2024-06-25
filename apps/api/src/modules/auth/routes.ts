import { OpenAPIHono as Hono } from '@hono/zod-openapi'
import type { Env } from '../../types'
import { getMe, login, logout, register } from './handlers'

export const authRouter = new Hono<Env>()
  .route('/', login)
  .route('/', logout)
  .route('/', getMe)
  .route('/', register)
