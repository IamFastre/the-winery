import { result } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type UserSaves = { saves: Tables<'saves'>[], count:number };
export type UserSavesParams = undefined;

export async function getUserSaves() {
  const supabase = createClient();

  const savesRes = await supabase
    .from('saves')
    .select('*')
    .order('timestamp', { ascending: false });

  if (savesRes.error)
    return result(null, savesRes.error);

  const countRes = await supabase
    .from('saves')
    .select('*', { count: 'exact', head: true });

  if (countRes.error)
    return result(null, countRes.error);

  return result<UserSaves>({ saves: savesRes.data, count: countRes.count ?? -1 }, savesRes.error);
}
