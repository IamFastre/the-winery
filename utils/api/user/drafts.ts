import { result } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type UserDrafts = Tables<'drafts'>[];
export type UserDraftsParams = { limit:number };

export async function getUserDrafts() {
  const supabase = createClient();

  const res = await supabase
    .from('drafts')
    .select('*')
    .order('timestamp', { ascending: false });

  return result<UserDrafts | null>(res.data, res.error);
}
