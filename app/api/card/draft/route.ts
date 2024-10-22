import { NextRequest } from 'next/server';

import { badRequest, notFound, success } from '@/utils';
import { CardDraft, getCardDraft } from '@/utils/api/card/draft';

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (params.has('id')) {
    const id = params.get('id')!;
    const res = await getCardDraft(id);

    if (res.error)
      return notFound(res.error);

    return success<CardDraft>(res.data, headers);
  }

  return badRequest("Missing 'id' parameter");
}
