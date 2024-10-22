import { result } from '@/utils/api';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type UserInfo = Tables<'profiles'> & { mail_confirmed: boolean };
export type UserInfoParams = { id:string } | { username:string };

function cureValue(value:string) {
  return value
    .replaceAll(/[^a-z0-9_-]/gi, '•')
    .toLowerCase();
}

async function mailConfirmed(supabase:ReturnType<typeof createClient>, id:string) {
  const res = await supabase.rpc('is_confirmed', { id });
  return res.data ?? false;
}

export async function getUserInfo(what:'id' | 'username' | 'self', value:string | null = null) {
  const supabase = createClient();

  if (what === 'self') {
    const { data:{ user }, error:userError } = await supabase.auth.getUser();

    if (userError || !user)
      return result(null, userError);

    return getUserInfo('id', user.id);
  }
  
  let user:Tables<'profiles'> | null = null;

  if (what === 'id') {
    const res = await supabase
      .from('profiles')
      .select('*')
      .eq('id', cureValue(value ?? ''))
      .single();

    if (res.error)
      return result(null, res.error);
    user = res.data;
  }

  if (what === 'username') {
    const res = await supabase
      .from('profiles')
      .select('*')
      .ilike('username', cureValue(value ?? ''))
      .single();

    if (res.error)
      return result(null, res.error);
    user = res.data;
  }

  return result<UserInfo>({ ...user!, mail_confirmed: await mailConfirmed(supabase, user!.id) }, null);
}
