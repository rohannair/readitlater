import {
  db,
  sessions,
  insertSessionSchema,
  type selectSessionSchema,
} from '@/lib/db'
import { createId } from '@paralleldrive/cuid2'
import { eq } from 'drizzle-orm'

import type { z } from 'zod'

type Session = z.infer<typeof selectSessionSchema>
type CreateSession = z.infer<typeof insertSessionSchema>

export const getSessionById = async (id: string): Promise<Session | null> => {
  const [session] = await db.select().from(sessions).where(eq(sessions.id, id))

  return session
}

export const createSession = async (params: Omit<CreateSession, 'id'>) => {
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
}
