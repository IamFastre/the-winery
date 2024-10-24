import { result } from '@/utils/api';
import { createClient as createAdminClient } from '@/supabase/admin';
import { createClient as createServerClient } from '@/supabase/server';

export type CardSuperLike = { action: 'like' | 'unlike', done:boolean, last:number };
export type CardSuperLikeParams = { id:string | number };

export async function postCardSuperLike(id:string | number) {
  const supabase = createServerClient();
  const supadmin = createAdminClient();
  const { data:{ user }, error:userError } = await supabase.auth.getUser();

  if (userError || !user)
    return result(null, userError);

  const post = typeof id === 'number' ? id : Number.parseInt(id);

  // CHECK WHETHER POST EXISTS OR NOT
  const postResponse = await supadmin
    .from('posts')
    .select('*')
    .eq('id', post)
    .single();

  if (postResponse.error)
    return result(null, postResponse.error);

  // CHECK WHETHER POST IS SUPER LIKED OR NOT
  // TO DETERMINE WHAT TO DO (LIKE or UNLIKE)
  const postSuperLike = await supadmin
    .from('super_likes')
    .select('*')
    .eq('post', post)
    .eq('user_uuid', user.id)
    .maybeSingle();

  if (postSuperLike.error)
    return result(null, postSuperLike.error);

  const action:CardSuperLike['action'] = postSuperLike.data === null || postSuperLike.data?.redacted
    ? 'like'
    : 'unlike';

  // GET THE LAST SUPER LIKE `user` DID
  const lastSuperLike = await supadmin
    .from('super_likes')
    .select('*')
    .eq('user_uuid', user.id)
    .order('timestamp', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lastSuperLike.error)
    return result(null, lastSuperLike.error);

  // CALCULATE TIME SINCE LAST
  const hrsElapsed = Math.floor((Date.now() - Date.parse(lastSuperLike.data?.timestamp ?? "0")) / (1000 * 60 * 60));
  const canLike = hrsElapsed >= 24;
  let done = false;

  if (action === 'like' && canLike) {
    const add = postSuperLike.data?.redacted
      // LIKE ALREADY EXISTS BUT IS REDACTED, UNREDACT IT
      ? await supadmin
          .from('super_likes')
          .update({ redacted: false, timestamp: new Date().toISOString() })
          .eq('post', post)
          .eq('user_uuid', user.id)
      // LIKE DOESN'T EXIST, INSERT IT
      : await supadmin
          .from('super_likes')
          .insert({ post, user_uuid: user.id });

    if (add.error)
      return result(null, add.error);
    else
      done = true; // SUCCESS
  } else if (action === 'unlike') {
    // REDACT LIKES, NOT DELETE
    const remove = await supadmin
      .from('super_likes')
      .update({ redacted: true })
      .eq('post', post)
      .eq('user_uuid', user.id);

    if (remove.error)
      return result(null, remove.error);
    else
      done = true; // SUCCESS
  }

  return result<CardSuperLike>({ action, done, last: hrsElapsed }, null);
}
