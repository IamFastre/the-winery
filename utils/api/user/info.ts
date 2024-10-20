import { result } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type UserInfo = Tables<'profiles'> & { mail_confirmed: boolean };
export type UserInfoParams = { id:string } | { username:string };

export async function getUserInfo(what:'id' | 'identifier' | 'self', value:string | null = null) {
  const supabase = createClient();

  if (what === 'self') {
    const { data:{ user }, error:userError } = await supabase.auth.getUser();

    if (userError || !user)
      return result(null, userError);

    return getUserInfo('id', user.id);
  }

  const userRes = await supabase
    .from('profiles')
    .select('*')
    .eq(what, value ?? '')
    .single();

  if (userRes.error)
    return result(null, userRes.error);
  
  const confRes = await supabase.rpc('is_confirmed', { id: userRes.data.id });

  if (confRes.error)
    return result(null, confRes.error);

  return result<UserInfo>({ ...userRes.data, mail_confirmed: confRes.data }, null);
}
