import { NextRequest } from 'next/server';

import { badRequest, notFound, result, success } from '@/utils';
import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';

export type CardDraft = Tables<'drafts'>;
export type CardDraftParams = { id:number };

export async function getCardDraft(id:string | number) {
  'use server';
  const supabase = createClient();

  const res = await supabase
    .from('drafts')
    .select('*')
    .eq('id', id)
    .single();

  return result<CardDraft | null>(res.data, res.error);
}

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);
  const supabase = createClient();

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (params.has('id')) {
    const id = params.get('id')!;
    const res = await getCardDraft(id);

    if (res.error)
      return notFound(res.error, headers);

    return success<CardDraft>(res.data, headers);
  }

  return badRequest("Missing 'id' parameter", headers);
}
