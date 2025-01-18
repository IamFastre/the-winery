import _ from 'lodash';
import { result } from '@/utils/api';
import { getUserInfo, UserInfo } from '@/utils/api/user/info';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type CardFeed = { posts: Tables<'posts'>[], users: { [id:string]:UserInfo } };
export type CardFeedParams = { limit?:number; sort?:'default' | 'new' | 'random'; };

export async function getCardFeed(limit:number = 25, sortBy:CardFeedParams['sort'] = 'default') {
  const supabase = createClient();

  const res = await supabase
    .from('posts')
    .select('*, score')
    .limit(limit)
    .order(
      sortBy === 'new'
      ? 'timestamp'
      : 'score',
      { ascending: false }
    );

  if (res.error)
    return result(null, res.error);

  if (sortBy === 'random')
    res.data = _.shuffle(res.data);

  const users:CardFeed['users'] = { };

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
