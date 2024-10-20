import { NextRequest } from 'next/server';

import { badRequest, notFound, result, success } from '@/utils';
import { createClient } from '@/supabase/server';

export type CardInteractions = { liked:boolean, saved:boolean, likeCount:number };
export type CardInteractionsParams = { id:number };

export async function getCardInteractions(id:string | number) {
  'use server';
  const supabase = createClient();
  const { data:{ user }, error:userError } = await supabase.auth.getUser();

  if (userError || !user)
    return result(null, userError);

  // IS POST LIKED
  const likedRes = await supabase
  .from('likes')
  .select('*')
  .eq('post', id)
  .eq('user_uuid', user.id)
  .maybeSingle();
  
  if (likedRes.error)
    return result(null, likedRes.error);
  
  // IS POST SAVED
  const savedRes = await supabase
  .from('saves')
  .select('*')
  .eq('post', id)
  .eq('user_uuid', user.id)
  .maybeSingle();

  if (savedRes.error)
    return result(null, savedRes.error);

  // POST LIKE COUNT
  const likesRes = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post', id);

  if (likesRes.error)
    return result(null, likesRes.error);

  return result<CardInteractions>({
    liked: likedRes.data !== null,
    saved: savedRes.data !== null,
    likeCount: likesRes.count ?? -1,
  }, null);
}

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (params.has('id')) {
    const id = params.get('id')!;
    const res = await getCardInteractions(id);

    if (res.error)
      return notFound(res.error, headers);

    return success<CardInteractions>(res.data, headers);
  }

  return badRequest("Missing 'id' parameter", headers);
}
