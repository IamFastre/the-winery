import { result } from '@/utils/api';
import { createClient } from '@/supabase/server';

export type CardDelete = true;
export type CardDeleteParams = { id:string | number };

export async function postCardDelete(id:string | number) {
  const supabase = createClient();

  const res = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
    .single();

  if (res.error)
    return result(null, res.error);

  return result<CardDelete>(true, null);
}
