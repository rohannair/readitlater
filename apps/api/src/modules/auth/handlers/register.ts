import { setAuthCookie } from '@/lib/cookie'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { hash } from 'src/lib/crypto'
import { insertUserSchema } from 'src/lib/db'
import { userRepository } from 'src/lib/db/repositories/users.repository'
import type { Env } from 'src/types'

const registerSchema = insertUserSchema
  .omit({
    id: true,
    passwordHash: true,
  })
  .extend({
    email: z.string().email().toLowerCase(),
    password: z.string().min(8),
  })

export const register = new OpenAPIHono<Env>().openapi(
  createRoute({
    method: 'post',
    path: '/register',
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
      },
    },
  }),
  async (c) => {
    const { email, password } = c.req.valid('json')

    const existingUser = await userRepository.getUserByEmail(email)

    if (existingUser) {
      return c.json({ error: 'User already exists' }, 400)
    }

    const passwordHash = await hash(password)
    const { user, cookie } = await userRepository.createUser({
      email,
      passwordHash,
    })

    setAuthCookie(c, cookie.name, cookie.value)
    return c.json({ message: 'User registered successfully', user }, 201)
  },
)
