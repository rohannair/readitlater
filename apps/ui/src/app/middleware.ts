import { getAuthCookie } from '@/lib/cookie'
import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const user = getAuthCookie()

  if (user) {
    return NextResponse.redirect('/')
  }

  return NextResponse.redirect(new URL('/login', request.url))
}
