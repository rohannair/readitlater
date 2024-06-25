import { lucia } from '@/lib/auth'
import { userRepository } from '@/lib/db//repositories/users.repository'
import type { Env } from '@/types'
import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { getCookie } from 'hono/cookie'

export const getMe = new OpenAPIHono<Env>().openapi(
  createRoute({
    method: 'get',
    path: '/me',
    responses: {
      200: {
        description: 'Login success',
      },
    },
  }),
  async (c) => {
    const sessionId = getCookie(c, lucia.sessionCookieName)

    if (!sessionId) return c.json({ message: 'Not logged in bye', sessionId })

    const user = await userRepository.getUserById(sessionId)
    return c.json({ user })
  },
)
