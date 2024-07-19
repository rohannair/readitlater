import { lucia } from '@/lib/auth'
import type { Context, Next } from 'hono'
import { getCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'

export const verifySession = createMiddleware(
  async (c: Context, next: Next) => {
    const sessionId = getCookie(c, lucia.sessionCookieName) ?? null
    console.log('All cookies:', getCookie(c))
    console.log('Raw Cookie header:', c.req.raw.headers.get('cookie'))
    console.log('Request URL:', c.req.url)
    console.log('Request method:', c.req.method)
    console.log(
      'Request headers:',
      // @ts-ignore
      Object.fromEntries(c.req.raw.headers?.entries()),
    )

    if (!sessionId) {
      c.set('session', null)
      c.set('user', null)
      return c.json({ message: 'Not logged in' }, 401)
    }

    const { session, user } = await lucia.validateSession(sessionId)
    if (session?.fresh) {
      c.header('Set-Cookie', lucia.createSessionCookie(sessionId).serialize(), {
        append: true,
      })
    }

    if (!session) {
      c.header('Set-Cookie', lucia.createBlankSessionCookie().serialize(), {
        append: true,
      })
    }

    c.set('user', user)
    c.set('session', session)

    return next()
  },
)
