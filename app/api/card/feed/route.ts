import { NextRequest } from 'next/server';

import { getUserInfo } from '@/app/api/user/info/route';
import { notFound, result, success } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type CardFeed = { posts: Tables<'posts'>[], users: { [identifier:string]:Tables<'profiles'> } };
export type CardFeedParams = { id:number };

export async function getCardFeed(limit:number = 25) {
  'use server';
  const supabase = createClient();

  const res = await supabase
    .from('posts')
    .select()
    .limit(limit)
    .order('timestamp', { ascending: false });

  if (res.error)
    return result(null, res.error);

  const users:CardFeed['users'] = {};

  for (const author of res.data.map(p => p.author) ?? []) {
    if (author && !users[author]) {
      const res = await getUserInfo('identifier', author);
      if (res.error)
        return result(null, res.error);
      users[author] = res.data;
    }
  }

  return result<CardFeed>({ posts: res.data, users }, null);
}

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const parsed = Number.parseInt(params.get('limit')!);
  const limit = parsed || parsed === 0 ? parsed : undefined;

  const res = await getCardFeed(limit);

  if (res.error)
    return notFound(res.error, headers);

  return success<CardFeed>(res.data, headers);
}
