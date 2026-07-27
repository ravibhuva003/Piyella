import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/account(.*)',
  '/checkout(.*)',
]);

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const adminCookie = req.cookies.get('piyella_admin_session')?.value;

  // Protect /admin routes - Require piyella_admin_session cookie OR authenticated Clerk admin
  if (isAdminRoute(req)) {
    if (adminCookie === 'true' || userId) {
      return NextResponse.next();
    }
    const adminLoginUrl = new URL('/admin-login', req.url);
    return NextResponse.redirect(adminLoginUrl);
  }

  // Guard Customer Protected Routes
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
