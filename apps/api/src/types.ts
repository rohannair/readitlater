import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { Session, User } from 'lucia'

export type ContextVariables = {
  user: User | null
  session: Session | null
  db: NodePgDatabase
}

export type Env = {
  Variables: ContextVariables
}
