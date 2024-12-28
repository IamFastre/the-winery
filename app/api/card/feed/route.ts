import { NextRequest } from 'next/server';

import { notFound, success } from '@/utils/api';
import { CardFeed, CardFeedParams, getCardFeed } from '@/utils/api/card/feed';

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const parsed = Number.parseInt(params.get('limit')!);
  const limit = parsed || parsed === 0 ? parsed : undefined;
  const sort  = (params.get('sort') ?? 'default') as CardFeedParams['sort'];

  const res = await getCardFeed(limit, sort);

  if (res.error)
    return notFound(res.error);

  return success<CardFeed>(res.data, headers);
}
