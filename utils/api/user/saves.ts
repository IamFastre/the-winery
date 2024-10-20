import { result } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type UserSaves = Tables<'saves'>[];
export type UserSavesParams = undefined;

export async function getUserSaves() {
  const supabase = createClient();

  const res = await supabase
    .from('saves')
    .select('*')
    .order('timestamp', { ascending: false });

  return result<UserSaves | null>(res.data, res.error);
}
