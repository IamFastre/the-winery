import { result } from '@/utils/api';
import { getUserInfo } from '@/utils/api/user/info';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type CardFeed = { posts: Tables<'posts'>[], users: { [id:string]:Tables<'profiles'> } };
export type CardFeedParams = { id:number };

export async function getCardFeed(limit:number = 25) {
  const supabase = createClient();

  const res = await supabase
    .from('posts')
    .select('*, score')
    .limit(limit)
    .order('score', { ascending: false });

  if (res.error)
    return result(null, res.error);

  const users:CardFeed['users'] = {};

  for (const author of res.data.map(p => p.author_uuid) ?? []) {
    if (author && !users[author]) {
      const res = await getUserInfo('id', author);
      if (res.error)
        return result(null, res.error);
      users[author] = res.data;
    }
  }

  return result<CardFeed>({ posts: res.data, users }, null);
}
