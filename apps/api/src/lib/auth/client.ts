import { env } from '@/env'
import { db, sessions, users } from '@/lib/db'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia, TimeSpan } from 'lucia'

interface DatabaseUserAttributes {
  email: string
  givenName: string
  familyName: string
}

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users)

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, 'w'),
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      name: `${attributes.givenName} ${attributes.familyName}`,
    }
  },
})
