import { redirect, RedirectType } from "next/navigation";
import { getUser } from "@/utils/server";

export default async function AuthLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  const { data:user } = await getUser();

  if (user)
    redirect('/', RedirectType.replace);

  return children;
}
