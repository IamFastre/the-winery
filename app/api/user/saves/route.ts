import { NextRequest } from 'next/server';

import { notFound, success } from '@/utils';
import { getUserSaves, UserSaves } from '@/utils/api/user/saves';

export async function GET(request:NextRequest) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const res = await getUserSaves();

  if (res.error)
    return notFound(res.error, headers);

  return success<UserSaves>(res.data, headers);
}
