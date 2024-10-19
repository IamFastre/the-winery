import { NextRequest } from 'next/server';

import { badRequest, notFound, result, success } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type CardPost = Tables<'posts'>;
export type CardPostParams = { id:number };

export async function getCardPost(id:string | number) {
  'use server';
  const supabase = createClient();

  const res = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  return result<CardPost | null>(res.data, res.error);
}

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (params.has('id')) {
    const id = params.get('id')!;
    const res = await getCardPost(id);

    if (res.error)
      return notFound(res.error, headers);

    return success<CardPost>(res.data, headers);
  }

  return badRequest("Missing 'id' parameter", headers);
}
