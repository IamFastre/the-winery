import { redirect, RedirectType } from "next/navigation";
import { getProfile } from "@/supabase/actions/user";

export default async function AuthLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  const { data:user } = await getProfile();

  if (user)
    redirect('/', RedirectType.replace);

  return children;
}
