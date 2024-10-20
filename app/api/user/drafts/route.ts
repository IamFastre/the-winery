import { NextRequest } from 'next/server';

import { notFound, success } from '@/utils';
import { getUserDrafts, UserDrafts } from '@/utils/api/user/drafts';

export async function GET(request:NextRequest) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const res = await getUserDrafts();

  if (res.error)
    return notFound(res.error, headers);

  return success<UserDrafts>(res.data, headers);
}
