import { NextRequest } from 'next/server';

import { notFound, success } from '@/utils/api';
import { getUserInfo, UserInfo } from '@/utils/api/user/info';

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (params.has('id')) {
    const id = params.get('id')!;
    const res = await getUserInfo('id', id);

    if (res.error)
      return notFound(res.error);

    return success<UserInfo>(res.data, headers);
  }

  if (params.has('username')) {
    const username = params.get('username')!;
    const res = await getUserInfo('username', username.toLowerCase());

    if (res.error)
      return notFound(res.error);

    return success<UserInfo>(res.data, headers);
  }

  const res = await getUserInfo('self');

  if (res.error)
    return notFound(res.error);

  return success<UserInfo>(res.data, headers);
}
