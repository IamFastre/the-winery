import { result } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type UserDrafts = { drafts:Tables<'drafts'>[], count:number };
export type UserDraftsParams = undefined;

export async function getUserDrafts() {
  const supabase = createClient();

  const draftsRes = await supabase
    .from('drafts')
    .select('*')
    .order('timestamp', { ascending: false });

  if (draftsRes.error)
    return result(null, draftsRes.error);

  const countRes = await supabase
    .from('drafts')
    .select('*', { count: 'exact', head: true });

  if (countRes.error)
    return result(null, countRes.error);

  return result<UserDrafts>({ drafts: draftsRes.data, count: countRes.count ?? -1 }, draftsRes.error);
}
