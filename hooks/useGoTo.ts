import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function useGoTo() : [boolean, (path:string) => void, string] {
  const router  = useRouter();
  const current = usePathname();
  const [redirecting, setRedirecting] = useState(false);

  const goto = (path:string) => {
    setRedirecting(true);

    setTimeout(() => {
      router.push(path);
      setRedirecting(false);
    }, 960)
  };

  return [redirecting, goto, current];
}