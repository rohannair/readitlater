import type { Context } from 'hono'
import { setCookie } from 'hono/cookie'

export function setAuthCookie(c: Context, name: string, value: string) {
  return setCookie(c, name, value, {
    httpOnly: true,
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}
