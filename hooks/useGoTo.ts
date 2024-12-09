import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type NavigationType = 'assign' | 'push' | 'replace';

export function useGoTo() : [boolean, (path:string, type?:NavigationType, newTab?:boolean) => void, string] {
  const router  = useRouter();
  const current = usePathname();
  const [redirecting, setRedirecting] = useState(false);

  const goto = (path:string, type:NavigationType = 'push', newTab:boolean = false) => {
    setRedirecting(true);

    setTimeout(() => {
      if (type === 'assign') {
        location.assign(path);
      } else if (type === 'push') {
        if (newTab)
          window.open(path, '_blank');
        else
          router.push(path);
      } else if (type === 'replace') {
        location.replace(path);
      } else {
        throw "wtf is that";
      }
      setRedirecting(false);
    }, 960);
  };

  return [redirecting, goto, current];
}