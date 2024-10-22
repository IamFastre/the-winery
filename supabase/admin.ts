import "server-only";

import { createServerClient } from '@supabase/ssr';

import { Database } from './types';

export function createClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        getAll() { return []; },
      },
    }
  );
}
