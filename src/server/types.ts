import type { Session, User } from 'lucia'

export type ContextVariables = {
  user: User | null
  session: Session | null
}

export type Env = {
  Variables: ContextVariables
}
