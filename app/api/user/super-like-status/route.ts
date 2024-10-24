import { notFound, success } from '@/utils/api';
import { getUserSuperLikeStatus, UserSuperLikeStatus } from '@/utils/api/user/super-like-status';

export async function GET() {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const res = await getUserSuperLikeStatus();

  if (res.error)
    return notFound(res.error);

  return success<UserSuperLikeStatus>(res.data, headers);
}
