import { type NextRequest } from 'next/server';
import { updateSession } from '@/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|static|_next/image|favicon.ico|.*sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|tff|otf|woff2?)$).*)',
  ],
};
