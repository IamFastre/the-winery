import { NextRequest } from 'next/server';

import { badRequest, notFound, success } from '@/utils';
import { CardInteractions, getCardInteractions } from '@/utils/api/card/interactions';

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (params.has('id')) {
    const id = params.get('id')!;
    const res = await getCardInteractions(id);

    if (res.error)
      return notFound(res.error);

    return success<CardInteractions>(res.data, headers);
  }

  return badRequest("Missing 'id' parameter");
}
