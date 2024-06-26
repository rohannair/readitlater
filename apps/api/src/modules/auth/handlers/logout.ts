import { lucia } from '@/lib/auth'
import { userRepository } from '@/lib/db/repositories/users.repository'
import type { Env } from '@/types'
import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { getCookie, setCookie } from 'hono/cookie'

export const logout = new OpenAPIHono<Env>().openapi(
  createRoute({
    method: 'get',
    path: '/logout',
    responses: {
      200: {
        description: 'Login success',
      },
    },
  }),
  async (c) => {
    const sessionId = c.req.header('Authorization')?.split(' ')[1]
    if (!sessionId) return c.json({ message: 'Not logged in hi' })

    const { cookie } = await userRepository.logout(sessionId)

    setCookie(c, cookie.name, cookie.value, cookie.attributes)
    return c.json({ message: 'Logged out' })
  },
)
