import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_session')?.value
  const { pathname } = request.nextUrl

  // Redirect to home if token exists and trying to access login or signup
  if (token && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect to login if no token and accessing protected routes
  if (
    !token &&
    !pathname.startsWith('/login') &&
    !pathname.startsWith('/signup')
  ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    '/login',
    '/signup',
  ],
}
