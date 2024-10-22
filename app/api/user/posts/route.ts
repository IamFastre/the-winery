import { NextRequest } from 'next/server';

import { badRequest, notFound, success } from '@/utils';
import { getUserPosts, UserPosts } from '@/utils/api/user/posts';

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (params.has('id')) {
    const id = params.get('id')!;
    const res = await getUserPosts('author_uuid', id);

    if (res.error)
      return notFound(res.error);

    return success<UserPosts>(res.data, headers);
  }

  if (params.has('username')) {
    const username = params.get('username')!;
    const res = await getUserPosts('author', username.toLowerCase());

    if (res.error)
      return notFound(res.error);

    return success<UserPosts>(res.data, headers);
  }

  return badRequest("Missing 'id' or 'username' parameter");
}
