import { NextRequest } from 'next/server';

import { badRequest, notFound, success } from '@/utils';
import { getUserSearch, UserSearch } from '@/utils/api/user/search';

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (params.has('q')) {
    const q = params.get('q')!;
    const res = await getUserSearch(q);

    if (res.error)
      return notFound(res.error, headers);

    return success<UserSearch>(res.data, headers);
  }

  return badRequest("Missing 'q' parameter", headers);
}
