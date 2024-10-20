import { redirect, RedirectType } from "next/navigation";
import { getUserInfo } from "@/utils/api/user/info";

export default async function AuthLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  const { data:user } = await getUserInfo('self');

  if (user)
    redirect('/', RedirectType.replace);

  return children;
}
