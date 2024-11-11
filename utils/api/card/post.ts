import { result } from '@/utils/api';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type CardPost = Tables<'posts'>;
export type CardPostParams = { id:number };

export async function getCardPost(id:string | number) {
  const supabase = createClient();

  const res = await supabase
    .from('posts')
    .select('*, generic_score')
    .eq('id', id)
    .single();

  return result<CardPost | null>(res.data, res.error);
}
