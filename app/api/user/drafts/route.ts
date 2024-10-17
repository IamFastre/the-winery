import { NextRequest } from 'next/server';

import { notFound, success } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type UserDrafts = Tables<'drafts'>[];
export type UserDraftsParams = { limit:number };

export async function GET(request:NextRequest) {
  const supabase = createClient();

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const res = await supabase
    .from('drafts')
    .select('*')
    .order('timestamp', { ascending: false });

  if (res.error)
    return notFound(res.error, headers);

  return success<UserDrafts>(res.data, headers);
}
