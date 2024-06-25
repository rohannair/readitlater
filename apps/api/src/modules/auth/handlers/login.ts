import { insertUserSchema } from '@/lib/db'
import { userRepository } from '@/lib/db/repositories/users.repository'
import type { Env } from '@/types'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { setCookie } from 'hono/cookie'

const registerSchema = insertUserSchema
  .omit({
    id: true,
    passwordHash: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    email: z.string().email(),
    password: z.string().min(8),
  })

export const login = new OpenAPIHono<Env>().openapi(
  createRoute({
    method: 'post',
    path: '/login',
    request: {
      body: {
        description: 'Request body',
        content: {
          'application/json': {
            schema: registerSchema.openapi('Login'),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Login success',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
              user: z
                .object({
                  id: z.string().optional(),
                  email: z.string().email().optional(),
                })
                .optional()
                .openapi('User'),
            }),
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
      },
    },
  }),
  async (c) => {
    const { email, password } = c.req.valid('json')
    const { user, cookie } = await userRepository.login(email, password)

    if (!user?.email) {
      return c.json({ message: 'Login failed' }, 401)
    }

    setCookie(c, cookie.name, cookie.value, cookie.attributes)
    return c.json(
      {
        message: 'Logged in',
        user: { id: user.id, email: user.email },
      },
      200,
    )
  },
)
