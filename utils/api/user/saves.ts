import { result } from '@/utils/api';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

import { CardFeed } from '@/utils/api/card/feed';
import { getCardPost } from '@/utils/api/card/post';
import { getUserInfo } from '@/utils/api/user/info';

export type UserSaves = { saves:Tables<'posts'>[], users:CardFeed['users'], count:number };
export type UserSavesParams = undefined;

export async function getUserSaves() {
  const supabase = createClient();

  // GET SAVES
  const savesRes = await supabase
    .from('saves')
    .select('*')
    .order('timestamp', { ascending: false });

  if (savesRes.error)
    return result(null, savesRes.error);

  // GET SAVES COUNT
  const countRes = await supabase
    .from('saves')
    .select('*', { count: 'exact', head: true });

  if (countRes.error)
    return result(null, countRes.error);

  // FETCH SAVED POSTS
  const posts:UserSaves['saves'] = [];

  for (const id of savesRes.data.map(s => s.post)) {
    const postRes = await getCardPost(id);
    
    if (postRes.error)
      return result(null, postRes.error);

    posts.push(postRes.data);
  }

  // FETCH SAVED POSTS' AUTHORS
  const users:CardFeed['users'] = {};

  for (const author of posts.map(p => p.author_uuid)) {
    if (author && !users[author]) {
      const res = await getUserInfo('id', author);
      if (res.error)
        return result(null, res.error);
      users[author] = res.data;
    }
  }

  return result<UserSaves>({ saves: posts, users, count: countRes.count ?? -1 }, savesRes.error);
}
