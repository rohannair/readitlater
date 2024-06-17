import { lucia } from '@/lib/auth'
import type { Context, Next } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'

export const verifySession = createMiddleware(
  async (c: Context, next: Next) => {
    const sessionId = getCookie(c, lucia.sessionCookieName)

    if (!sessionId) {
      return c.json({ message: 'Not logged in' }, 401)
    }

    const result = await lucia.validateSession(sessionId)

    const cookie = result.session
      ? lucia.createSessionCookie(result.session.id)
      : lucia.createBlankSessionCookie()

    setCookie(c, cookie.name, cookie.value, cookie.attributes)

    c.set('session', result.session)

    await next()
  },
)
