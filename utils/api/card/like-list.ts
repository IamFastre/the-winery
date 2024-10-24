import { result } from '@/utils/api';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

import { getUserInfo } from '@/utils/api/user/info';

export type CardLikeList = { likers:Tables<'profiles'>[], super_likers:Tables<'profiles'>[], count:number, super_count:number };
export type CardLikeListParams = { id:number };

export async function getCardLikeList(id:string | number) {
  const supabase = createClient();

  /* ================================= Likes ================================ */

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
  const likers:CardLikeList['likers'] = [];

  for (const author of likesRes.data.map(l => l.user_uuid)) {
    const res = await getUserInfo('id', author);

    if (res.error)
      return result(null, res.error);

    likers.push(res.data);
  }

  /* ============================== Super Likes ============================= */

  // GET POSTS' SUPER LIKES
  const superLikesRes = await supabase
    .from('super_likes')
    .select('*')
    .eq('post', id)
    .order('timestamp', { ascending: false });

  if (superLikesRes.error)
    return result(null, superLikesRes.error);

  // GET POSTS' SUPER LIKE COUNT
  const superCountRes = await supabase
    .from('super_likes')
    .select('*', { count: 'exact', head: true })
    .eq('post', id);

  if (superCountRes.error)
    return result(null, superCountRes.error);

  // FETCH POSTS' SUPER LIKERS
  const super_likers:CardLikeList['super_likers'] = [];

  for (const author of superLikesRes.data.map(l => l.user_uuid)) {
    const res = await getUserInfo('id', author);

    if (res.error)
      return result(null, res.error);

    super_likers.push(res.data);
  }

  return result<CardLikeList>({
    likers,
    super_likers,
    count: countRes.count ?? -1,
    super_count: superCountRes.count ?? -1
  }, likesRes.error);
}
