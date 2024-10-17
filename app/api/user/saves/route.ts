import { NextRequest } from 'next/server';

import { notFound, success } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type UserSaves = Tables<'saves'>[];
export type UserSavesParams = undefined;

export async function GET(request:NextRequest) {
  const supabase = createClient();

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const res = await supabase
    .from('saves')
    .select('*')
    .order('timestamp', { ascending: false });

  if (res.error)
    return notFound(res.error, headers);

  return success<UserSaves>(res.data, headers);
}
