import { result } from '@/utils/api';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

import { getUserInfo } from '@/utils/api/user/info';

export type CardLikeList = { users: Tables<'profiles'>[], count:number };
export type CardLikeListParams = { id:number };

export async function getCardLikeList(id:string | number) {
  const supabase = createClient();

  // GET POSTS' LIKES
  const likesRes = await supabase
    .from('likes')
    .select('*')
    .eq('post', id)
    .order('timestamp', { ascending: false });

  if (likesRes.error)
    return result(null, likesRes.error);
  
  // GET POSTS' LIKE COUNT
  const countRes = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post', id);

  if (countRes.error)
    return result(null, countRes.error);

  // FETCH POSTS' LIKERS
  const users:CardLikeList['users'] = [];

  for (const author of likesRes.data.map(l => l.user_uuid)) {
    const res = await getUserInfo('id', author);

    if (res.error)
      return result(null, res.error);

    users.push(res.data);
  }

  return result<CardLikeList>({ users, count: countRes.count ?? -1 }, likesRes.error);
}
