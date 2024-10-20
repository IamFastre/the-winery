import { NextRequest } from 'next/server';

import { badRequest, notFound, result, success } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type CardLikeList = Tables<'likes'>[];
export type CardLikeListParams = { id:number };

export async function getCardLikeList(id:string | number) {
  'use server';
  const supabase = createClient();

  const res = await supabase
    .from('likes')
    .select('*')
    .eq('post', id)
    .order('timestamp', { ascending: false });

  return result<CardLikeList | null>(res.data, res.error);
}

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (params.has('id')) {
    const id = params.get('id')!;
    const res = await getCardLikeList(id);

    if (res.error)
      return notFound(res.error, headers);

    return success<CardLikeList>(res.data, headers);
  }

  return badRequest("Missing 'id' parameter", headers);
}
