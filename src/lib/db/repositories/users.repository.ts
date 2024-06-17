import { lucia } from '@/lib/auth'
import { verify } from '@/lib/crypto'
import { db, insertUserSchema, type selectUserSchema, users } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'
import { type Cookie, generateIdFromEntropySize } from 'lucia'
import type { z } from 'zod'

type User = z.infer<typeof selectUserSchema>
type CreateUser = z.infer<typeof insertUserSchema>
type UserResponse = {
  user: Partial<User>
  cookie: Cookie
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const [user] = await db.select().from(users).where(eq(users.email, email))

  return user
}

export const createUser = async (
  params: Omit<CreateUser, 'id'>,
): Promise<UserResponse> => {
  const values = insertUserSchema.safeParse({
    ...params,
    id: generateIdFromEntropySize(10),
  })

  if (!values.success) {
    throw new Error('Invalid data')
  }

  const [user] = await db.insert(users).values(values.data).returning({
    id: users.id,
    email: users.email,
  })

  const session = await lucia.createSession(user.id, {})
  const cookie = lucia.createSessionCookie(session.id)

  return { user, cookie }
}

export const login = async (
  email: string,
  password: string,
): Promise<UserResponse> => {
  const user = await getUserByEmail(email)

  if (!user) {
    throw new HTTPException(401, { message: 'Login failed' })
  }

  const validPassword = await verify(password, user.passwordHash)

  if (!validPassword) {
    throw new HTTPException(401, { message: 'Login failed' })
  }

  const session = await lucia.createSession(user.id, {})
  const cookie = lucia.createSessionCookie(session.id)

  return { user, cookie }
}

export const logout = async (
  sessionId: string,
): Promise<{
  user: null
  cookie: Cookie
}> => {
  await lucia.invalidateSession(sessionId)

  const cookie = lucia.createBlankSessionCookie()

  return { user: null, cookie }
}
