import { notFound, success } from '@/utils/api';
import { getUserDrafts, UserDrafts } from '@/utils/api/user/drafts';

export async function GET() {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const res = await getUserDrafts();

  if (res.error)
    return notFound(res.error);

  return success<UserDrafts>(res.data, headers);
}
