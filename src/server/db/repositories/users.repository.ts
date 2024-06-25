import { lucia } from '@/lib/auth'
import { verify } from '@/lib/crypto'
import { db, insertUserSchema, type selectUserSchema, users } from '@/server/db'
import { eq, like } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'
import { type Cookie, generateIdFromEntropySize } from 'lucia'
import type { z } from 'zod'

type User = z.infer<typeof selectUserSchema>
type CreateUser = z.infer<typeof insertUserSchema>
type UserResponse = {
  user: Partial<User>
  cookie: Cookie
}
interface UserRepository {
  getUserByEmail(email: string): Promise<User>
  getUserById(id: string): Promise<User | null>
  createUser(params: Omit<CreateUser, 'id'>): Promise<UserResponse>
  updateUser(
    id: string,
    params: Partial<Omit<User, 'id'>>,
  ): Promise<User | null>
  searchByEmail(emailPattern: string): Promise<Partial<User>[]>
  login(email: string, password: string): Promise<UserResponse>
  logout(sessionId: string): Promise<{ user: null; cookie: Cookie }>
}

const createUserRepository = (): UserRepository => ({
  async getUserByEmail(email: string): Promise<User> {
    const [user] = await db.select().from(users).where(eq(users.email, email))
    return user
  },

  async getUserById(id: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id))
    return user || null
  },

  async createUser(params: Omit<CreateUser, 'id'>): Promise<UserResponse> {
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
  },

  async updateUser(
    id: string,
    params: Partial<Omit<User, 'id'>>,
  ): Promise<User | null> {
    const [updatedUser] = await db
      .update(users)
      .set({ ...params, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning()

    return updatedUser || null
  },

  async searchByEmail(emailPattern: string): Promise<Partial<User>[]> {
    return await db
      .select({
        id: users.id,
        email: users.email,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(like(users.email, `%${emailPattern}%`))
  },

  async login(email: string, password: string): Promise<UserResponse> {
    const { passwordHash, ...user } = await this.getUserByEmail(email)

    if (!user) {
      throw new HTTPException(401, { message: 'Login failed' })
    }

    const validPassword = await verify(password, passwordHash)

    if (!validPassword) {
      throw new HTTPException(401, { message: 'Login failed' })
    }

    const session = await lucia.createSession(user.id, {})
    const cookie = lucia.createSessionCookie(session.id)

    return { user, cookie }
  },

  async logout(sessionId: string): Promise<{ user: null; cookie: Cookie }> {
    await lucia.invalidateSession(sessionId)
    const cookie = lucia.createBlankSessionCookie()
    return { user: null, cookie }
  },
})

export const userRepository = createUserRepository()
