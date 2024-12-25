import { NextRequest } from 'next/server';

import { badRequest, notFound, success } from '@/utils/api';
import { CardDelete, CardDeleteParams, postCardDelete } from '@/utils/api/mut/card/delete';

export async function POST(request:NextRequest) {
  const params = await request.json() as CardDeleteParams;

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (params.id) {
    const id = params.id;
    const res = await postCardDelete(id);

    if (res.error)
      return notFound(res.error);

    return success<CardDelete>(res.data, headers);
  }

  return badRequest("Missing 'id' parameter");
}
