import type { User } from 'lucia'

export type Env = {
  Variables: {
    session: string
    user: User
  }
}
