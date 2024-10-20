import { result } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type UserSearch = Tables<'profiles'>[];
export type UserSearchParams = { q:string };

export async function getUserSearch(query:string) {
  const supabase = createClient();

  const res = await supabase
  .from('profiles')
  .select('*')
  .or(`username.ilike.%${query}%, display_name.ilike.%${query}%`);

  return result<UserSearch | null>(res.data, res.error);
}
