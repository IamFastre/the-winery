import { NextRequest } from 'next/server';

import { badRequest, notFound, success } from '@/utils';
import { CardLikeList, getCardLikeList } from '@/utils/api/card/like-list';

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (params.has('id')) {
    const id = params.get('id')!;
    const res = await getCardLikeList(id);

    if (res.error)
      return notFound(res.error, headers);

    return success<CardLikeList>(res.data, headers);
  }

  return badRequest("Missing 'id' parameter", headers);
}
