import { result } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type CardLikeList = Tables<'likes'>[];
export type CardLikeListParams = { id:number };

export async function getCardLikeList(id:string | number) {
  const supabase = createClient();

  const res = await supabase
    .from('likes')
    .select('*')
    .eq('post', id)
    .order('timestamp', { ascending: false });

  return result<CardLikeList | null>(res.data, res.error);
}
