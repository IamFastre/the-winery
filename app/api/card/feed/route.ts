import { NextRequest } from 'next/server';

import { notFound, success } from '@/utils/api';
import { CardFeed, getCardFeed } from '@/utils/api/card/feed';

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const parsed = Number.parseInt(params.get('limit')!);
  const limit = parsed || parsed === 0 ? parsed : undefined;

  const res = await getCardFeed(limit);

  if (res.error)
    return notFound(res.error);

  return success<CardFeed>(res.data, headers);
}
