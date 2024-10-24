import { result } from '@/utils/api';
import { createClient } from '@/supabase/server';

export type UserSuperLikeStatus = { is_able:boolean, last:number, last_post_id:number | null };
export type UserSuperLikeStatusParams = undefined;

export async function getUserSuperLikeStatus() {
  const supabase = createClient();
  const { data:{ user }, error:userError } = await supabase.auth.getUser();

  if (userError || !user)
    return result(null, userError);

  const lastRes = await supabase
    .from('super_likes')
    .select('*')
    .eq('user_uuid', user.id)
    .order('timestamp', { ascending: false })
    .maybeSingle();

  if (lastRes.error)
    return result(null, lastRes.error);

  const last = Math.floor((Date.now() - Date.parse(lastRes.data?.timestamp ?? "0")) / (1000 * 60 * 60));
  const is_able = last >= 24;

  return result<UserSuperLikeStatus>({
    is_able,
    last,
    last_post_id: lastRes.data?.post ?? null
  }, lastRes.error);
}
