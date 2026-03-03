import { NextRequest, NextResponse } from 'next/server'

function redirectToSignIn(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = '/auth'
  url.searchParams.set('tab', 'signin')
  return NextResponse.redirect(url)
}

export function middleware(request: NextRequest) {
  const session = request.cookies.get('mfc_session')?.value
  const role = request.cookies.get('mfc_role')?.value
  const { pathname } = request.nextUrl

  if (session !== 'active') {
    return redirectToSignIn(request)
  }

  if (pathname.startsWith('/admin') && role !== 'admin') {
    return redirectToSignIn(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/admin/:path*'],
}
