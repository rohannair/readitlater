import type { Hono } from 'hono'
import type { Session, User } from 'lucia'

export type CustomHono = Hono<{ Variables: { user: User; session: Session } }>
