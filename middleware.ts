import { type NextRequest } from 'next/server';
import { updateSession } from '@/supabase/middleware';

export async function middleware(request:NextRequest) {
  request.headers.set('x-request-url', request.url);
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!api/other|_next/static|static|_next/image|.*sitemap.xml|.*robots.txt|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|tff|otf|woff2?)$).*)',
  ],
};
