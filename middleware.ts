import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 1. Define paths to protect
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
    const isLoginPath = request.nextUrl.pathname === '/admin/login';

    // 2. If it's an admin path but NOT the login page
    if (isAdminPath && !isLoginPath) {
        // 3. Check for the session cookie
        const session = request.cookies.get('admin_session');

        // 4. If no session, redirect to login
        if (!session) {
            const loginUrl = new URL('/admin/login', request.url);
            // Optional: Add redirect param to return after login
            // loginUrl.searchParams.set('from', request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // 5. If it's the login page and we HAVE a session, redirect to dashboard
    if (isLoginPath) {
        const session = request.cookies.get('admin_session');
        if (session) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

// Config to match only relevant paths to avoid running on static assets
export const config = {
    matcher: ['/admin/:path*'],
};
