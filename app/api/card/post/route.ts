import { NextRequest } from 'next/server';

import { badRequest, notFound, success } from '@/utils/api';
import { CardPost, getCardPost } from '@/utils/api/card/post';

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (params.has('id')) {
    const id = params.get('id')!;
    const res = await getCardPost(id);

    if (res.error)
      return notFound(res.error);

    return success<CardPost>(res.data, headers);
  }

  return badRequest("Missing 'id' parameter");
}
