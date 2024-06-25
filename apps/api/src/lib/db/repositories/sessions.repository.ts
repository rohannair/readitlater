import {
  db,
  insertSessionSchema,
  type selectSessionSchema,
  sessions,
} from '@/lib/db'
import { createId } from '@paralleldrive/cuid2'
import { eq, lte } from 'drizzle-orm'

import type { z } from 'zod'

type Session = z.infer<typeof selectSessionSchema>
type CreateSession = z.infer<typeof insertSessionSchema>
interface SessionRepository {
  getSessionById(id: string): Promise<Session | null>
  createSession(params: Omit<CreateSession, 'id'>): Promise<Partial<Session>>
  deleteSession(id: string): Promise<void>
  deleteExpiredSessions(): Promise<void>
}

const createSessionRepository = (): SessionRepository => ({
  async getSessionById(id: string): Promise<Session | null> {
    const [session] = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, id))
    return session || null
  },

  async createSession(
    params: Omit<CreateSession, 'id'>,
  ): Promise<Partial<Session>> {
    const values = insertSessionSchema.safeParse({
      ...params,
      id: createId(),
    })

    if (!values.success) {
      throw new Error('Invalid data')
    }

    const [session] = await db.insert(sessions).values(values.data).returning({
      id: sessions.id,
      userId: sessions.userId,
      expiresAt: sessions.expiresAt,
    })

    return session
  },

  async deleteSession(id: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.id, id))
  },

  async deleteExpiredSessions(): Promise<void> {
    const now = new Date()
    await db.delete(sessions).where(lte(sessions.expiresAt, now))
  },
})

export const sessionRepository = createSessionRepository()
