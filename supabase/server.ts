import { createServerClient } from '@supabase/ssr';
import { cookies as getCookies } from 'next/headers';

export function createClient() {
  const cookies = getCookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
