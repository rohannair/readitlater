import { lucia } from '@/lib/auth'
import { hash } from '@/lib/crypto'
import { insertUserSchema } from '@/lib/db'
import { userRepository } from '@/lib/db/repositories/users.repository'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import { z } from 'zod'

const registerSchema = insertUserSchema
  .omit({
    id: true,
    passwordHash: true,
  })
  .extend({
    email: z.string().email(),
    password: z.string().min(8),
  })

const authRouter = new Hono()
  .post('/login', zValidator('json', registerSchema), async (c) => {
    const { email, password } = c.req.valid('json')
    const { user, cookie } = await userRepository.login(email, password)

    setCookie(c, cookie.name, cookie.value, cookie.attributes)
    return c.json({ message: 'Logged in', user })
  })
  .get('/logout', async (c) => {
    const sessionId = getCookie(c, lucia.sessionCookieName)
    if (!sessionId) return c.json({ message: 'Not logged in hi' })

    const { cookie } = await userRepository.logout(sessionId)

    setCookie(c, cookie.name, cookie.value, cookie.attributes)
    return c.json({ message: 'Logged out' })
  })
  .get('/me', async (c) => {
    console.log('!!!!!!!!!!!!!!!!!!! c', c)
    const sessionId = getCookie(c, lucia.sessionCookieName)
    console.log('!!!!!!!!!!!!!!!!!!! sessionId', sessionId)
    if (!sessionId) return c.json({ message: 'Not logged in bye', sessionId })

    const user = await userRepository.getUserById(sessionId)
    return c.json({ user })
  })
  .post('/register', zValidator('json', registerSchema), async (c) => {
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
  })

export default authRouter
