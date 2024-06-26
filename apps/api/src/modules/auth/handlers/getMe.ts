import { lucia } from '@/lib/auth'
import { userRepository } from '@/lib/db//repositories/users.repository'
import { sessionRepository } from '@/lib/db/repositories/sessions.repository'
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
    const sessionId = c.req.header('Authorization')?.split(' ')[1]
    if (!sessionId) return c.json({ message: 'Not logged in', sessionId }, 401)

    const session = await sessionRepository.getSessionById(sessionId)
    if (!session) return c.json({ message: 'Not logged in', sessionId }, 401)

    const res = await userRepository.getUserById(session.userId)
    if (!res) return c.json({ message: 'Not logged in', sessionId }, 401)

    // Remove passwordHash from response
    const { passwordHash, ...user } = res
    return c.json({ user })
  },
)
