import { hash } from '@/lib/crypto'
import { insertUserSchema } from '@/lib/db'
import { userRepository } from '@/lib/db/repositories/users.repository'
import type { Env } from '@/server/types'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { setCookie } from 'hono/cookie'

const registerSchema = insertUserSchema
  .omit({
    id: true,
    passwordHash: true,
  })
  .extend({
    email: z.string().email(),
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

    setCookie(c, cookie.name, cookie.value, cookie.attributes)
    return c.json({ message: 'User registered successfully', user }, 201)
  },
)
