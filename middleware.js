import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();

  const isLoggedIn = req.cookies.get('isLoggedIn')?.value;
  const role = req.cookies.get('role')?.value;

  // If not logged in → redirect to login
  if ((url.pathname.startsWith('/volunteer') || url.pathname.startsWith('/admin') || url.pathname.startsWith('/dashboard')) 
      && isLoggedIn !== 'true') {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Volunteer page → only volunteer role
  if (url.pathname.startsWith('/volunteer') && role !== 'volunteer') {
    url.pathname = '/not-authorized';
    return NextResponse.redirect(url);
  }

  // Admin page → only admin role
  if (url.pathname.startsWith('/admin') && role !== 'admin') {
    url.pathname = '/not-authorized';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/volunteer/:path*', '/admin/:path*', '/dashboard/:path*'],
};
