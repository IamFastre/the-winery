import { result } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type CardDraft = Tables<'drafts'>;
export type CardDraftParams = { id:number };

export async function getCardDraft(id:string | number) {
  const supabase = createClient();

  const res = await supabase
    .from('drafts')
    .select('*')
    .eq('id', id)
    .single();

  return result<CardDraft | null>(res.data, res.error);
}
