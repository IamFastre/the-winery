import "server-only";

import { createServerClient } from '@supabase/ssr';
import { cookies as getCookies } from 'next/headers';

import { Database } from './types';

export function createClient() {
  const cookies = getCookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        getAll() {
          return cookies.getAll();
        },
        setAll(targets) {
          try {
            targets.forEach(({ name, value, options }) => cookies.set(name, value, options));
          } catch { }
        },
      },
    }
  );
}
