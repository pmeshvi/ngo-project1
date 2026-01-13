import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isLoggedIn = request.cookies.get('isLoggedIn')?.value;
  const role = request.cookies.get('role')?.value;

  // Public pages
  if (
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/'
  ) {
    return NextResponse.next();
  }

  // Not logged in → redirect to login
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role-based protection
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/not-authorized', request.url));
  }

  if (pathname.startsWith('/volunteer') && role !== 'volunteer') {
    return NextResponse.redirect(new URL('/not-authorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/volunteer/:path*', '/dashboard/:path*'],
};
