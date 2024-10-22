import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import { Database } from './types';

const noAuthPaths = ['/auth', '/getting-started'];

export async function updateSession(request:NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(targets) {
          targets.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          targets.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user && !noAuthPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    const url = request.nextUrl.clone();
    url.pathname = '/getting-started';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
