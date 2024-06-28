import { useState } from "react";
import { useRouter } from "next/navigation";

export function useGoTo() : [boolean, (path:string) => void] {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const goto = (path:string) => {
    setRedirecting(true);

    setTimeout(() => {
      router.push(path);
      setRedirecting(false);
    }, 960)
  };

  return [redirecting, goto];
}