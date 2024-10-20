import { redirect } from "next/navigation";
import { getUserInfo } from "@/utils/api/user/info";

export default async function UserPage() {
  const { data:user } = await getUserInfo('self');

  if (user)
    redirect(`/u/${user.username}`);
  else
    redirect('/');
}
