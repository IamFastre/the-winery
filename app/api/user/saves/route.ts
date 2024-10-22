import { notFound, success } from '@/utils/api';
import { getUserSaves, UserSaves } from '@/utils/api/user/saves';

export async function GET() {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const res = await getUserSaves();

  if (res.error)
    return notFound(res.error);

  return success<UserSaves>(res.data, headers);
}
