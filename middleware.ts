import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AuthUtils } from '@/lib/auth/utils';
import { SUBSCRIPTION_PLANS } from '@/lib/auth/config';

// Protected API prefix
const PROTECTED_API_PREFIX = '/api/secure';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only inspect API routes
  if (!pathname.startsWith('/api')) return NextResponse.next();

  const token = req.cookies.get('auth-token')?.value;
  if (token) {
    const payload = AuthUtils.verifyToken(token);
    if (payload) {
      // Clone response and inject headers for downstream handlers
      const res = NextResponse.next();
      res.headers.set('x-user-id', payload.userId);
      res.headers.set('x-user-email', payload.email);
      res.headers.set('x-user-plan', payload.planId);
      return res;
    }
  }

  // Block protected prefix if unauthenticated
  if (pathname.startsWith(PROTECTED_API_PREFIX)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*']
};
