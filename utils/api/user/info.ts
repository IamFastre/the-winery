import { result } from '@/utils/api';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type UserInfo = Tables<'profiles'> & { finesse:number; mail_confirmed:boolean; meta:Omit<Tables<'users_meta'>, 'id'> };
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
      .select('*, finesse')
      .eq('id', cureValue(value ?? ''))
      .single();

    if (res.error)
      return result(null, res.error);
    user = res.data;
  }

  if (what === 'username') {
    const res = await supabase
      .from('profiles')
      .select('*, finesse')
      .ilike('username', cureValue(value ?? ''))
      .single();

    if (res.error)
      return result(null, res.error);
    user = res.data;
  }

  const metaRes = await supabase
    .from('users_meta')
    .select('*')
    .eq('id', user?.id ?? '')
    .single();

  const meta = metaRes.data as Partial<typeof metaRes.data>
  
  if (metaRes.error)
    return result<null>(null, metaRes.error);
  else
    delete meta?.id;

  return result<UserInfo>({
    ...user!,
    mail_confirmed: await mailConfirmed(supabase, user!.id),
    meta: meta as UserInfo['meta']
  }, null);
}
