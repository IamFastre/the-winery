import { NextRequest } from 'next/server';

import { badRequest, notFound, success } from '@/utils/api';
import { CardSuperLike, CardSuperLikeParams, postCardSuperLike } from '@/utils/api/mut/card/super-like';

export async function POST(request:NextRequest) {
  const params = await request.json() as CardSuperLikeParams;

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (params.id) {
    const id = params.id;
    const res = await postCardSuperLike(id);

    if (res.error)
      return notFound(res.error);

    return success<CardSuperLike>(res.data, headers);
  }

  return badRequest("Missing 'id' parameter");
}
