import { result } from '@/utils/api';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type UserSearch = Tables<'profiles'>[];
export type UserSearchParams = { q:string };

const escape = (s:string) => "\\" + s;

function cureUsername(value:string) {
  return value
    .replaceAll(/[^a-z0-9_-]/gi, '•');
}

function cureDisplayName(value:string) {
  return value
    .replaceAll(/[\,\.\:\(\)\"\\]/gi, escape)
    .replaceAll(/[\%\_\$\^\{\}]/gi, escape);
}

export async function getUserSearch(query:string) {
  const supabase = createClient();

  const u = cureUsername(query);
  const d = cureDisplayName(query);

  const res = await supabase
  .from('profiles')
  .select('*')
  .or(`username.ilike.%${u}%, display_name.ilike.%${d}%`);

  return result<UserSearch | null>(res.data, res.error);
}
