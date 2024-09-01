import { redirect } from "next/navigation";
import { getProfile } from "@/supabase/actions/user";

export default async function UserPage() {
  const { data:user } = await getProfile();

  if (user)
    redirect(`/u/${user.username}`);
  else
    redirect('/');
}
