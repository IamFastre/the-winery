import { getUser } from '@/utils/server';
import { redirect } from 'next/navigation'


export default async function HomePage() {
  const { data:user } = await getUser();

  if (user)
    redirect(`/u/${user.username}`);
}
