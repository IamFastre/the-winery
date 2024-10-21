import { redirect, RedirectType } from "next/navigation";
import { getUserInfo } from "@/utils/api/user/info";

export async function DisallowAuthorized({ children }: Readonly<{ children:React.ReactNode }>) {
  const { data:user } = await getUserInfo('self');

  if (user)
    redirect('/', RedirectType.replace);

  return children;
}
