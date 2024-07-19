import { insertUserSchema } from '@/lib/db'
import { userRepository } from '@/lib/db/repositories/users.repository'
import type { Env } from '@/types'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { setAuthCookie } from '@/lib/cookie'

const registerSchema = insertUserSchema
  .omit({
    id: true,
    passwordHash: true,
    createdAt: true,
    updatedAt: true,
    givenName: true,
    familyName: true,
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
                  id: z.string(),
                  email: z.string().email(),
                })
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
  // @ts-ignore
  async (c) => {
    const { email, password } = c.req.valid('json')

    try {
      const { user, cookie } = await userRepository.login(email, password)

      if (!user) {
        return c.json({ message: 'Invalid email or password' }, 401)
      }

      setAuthCookie(c, cookie.name, cookie.value)
      console.log(c.res.headers)

      return c.json(
        {
          message: 'Logged in successfully',
          user: { id: user.id, email },
        },
        200,
      )
    } catch (_) {
      return c.json({ message: 'An error occurred during login' }, 401)
    }
  },
)
