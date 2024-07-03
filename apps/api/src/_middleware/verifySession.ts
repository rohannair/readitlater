import { lucia } from '@/lib/auth'
import type { Context, Next } from 'hono'
import { createMiddleware } from 'hono/factory'

export const verifySession = createMiddleware(
  async (c: Context, next: Next) => {
    const sessionId = c.req.header('Authorization')?.split(' ')[1]

    if (!sessionId) {
      c.set('session', null)
      c.set('user', null)
      return c.json({ message: 'Not logged in' }, 401)
    }

    const { session, user } = await lucia.validateSession(sessionId)

    c.set('user', user)
    c.set('session', session)

    return next()
  },
)
