import { cookies } from 'next/headers'

interface SetCookieOptions {
  name: string
  value: string
  maxAge?: number
}

export function setCookie({ name, value, maxAge }: SetCookieOptions) {
  return cookies().set({
    name,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: maxAge ?? 60 * 60 * 24 * 7, // 1 week
  })
}

export function setAuthCookie(value: string) {
  return setCookie({ name: 'Auth_session', value })
}
