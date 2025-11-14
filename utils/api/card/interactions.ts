import { result } from '@/utils/api';
import { createClient } from '@/supabase/server';

export type CardInteractions = { liked:boolean, super_liked:boolean, saved:boolean, like_count:number, super_like_count:number };
export type CardInteractionsParams = { id:number };

export async function getCardInteractions(id:string | number) {
  const supabase = createClient();
  const { data:{ user }, error:userError } = await supabase.auth.getUser();

  if (userError || !user)
    return result(null, userError);

  // IS POST LIKED
  const likedRes = await supabase
    .from('likes')
    .select('*')
    .eq('post', parseInt(id.toString()))
    .eq('user_uuid', user.id)
    .maybeSingle();

  if (likedRes.error)
    return result(null, likedRes.error);

  // IS POST SUPER LIKED
  const superLikedRes = await supabase
    .from('super_likes')
    .select('*')
    .eq('post', parseInt(id.toString()))
    .eq('user_uuid', user.id)
    .maybeSingle();

  if (superLikedRes.error)
    return result(null, superLikedRes.error);

  // IS POST SAVED
  const savedRes = await supabase
    .from('saves')
    .select('*')
    .eq('post', parseInt(id.toString()))
    .eq('user_uuid', user.id)
    .maybeSingle();

  if (savedRes.error)
    return result(null, savedRes.error);

  // POST LIKE COUNT
  const likesRes = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post', parseInt(id.toString()));

  if (likesRes.error)
    return result(null, likesRes.error);

  // POST SUPER LIKE COUNT
  const superLikesRes = await supabase
    .from('super_likes')
    .select('*', { count: 'exact', head: true })
    .eq('post', parseInt(id.toString()));

  if (superLikesRes.error)
    return result(null, superLikesRes.error);

  return result<CardInteractions>({
    liked: likedRes.data !== null,
    super_liked: superLikedRes.data !== null,
    saved: savedRes.data !== null,
    like_count: likesRes.count ?? -1,
    super_like_count: superLikesRes.count ?? -1,
  }, null);
}
