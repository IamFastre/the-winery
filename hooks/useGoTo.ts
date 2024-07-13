import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function useGoTo() : [boolean, (path:string, type?:'push' | 'replace') => void, string] {
  const router  = useRouter();
  const current = usePathname();
  const [redirecting, setRedirecting] = useState(false);

  const goto = (path:string, type:'push' | 'replace' = 'push') => {
    setRedirecting(true);

    setTimeout(() => {
      if (type === 'push')
        router.push(path);
      else if (type === 'replace')
        router.replace(path)
      else
        throw "wtf is that";

      setRedirecting(false);
    }, 960);
  };

  return [redirecting, goto, current];
}