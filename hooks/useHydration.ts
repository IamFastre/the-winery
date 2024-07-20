import { useEffect, useState } from "react"

export function useHydration() {
  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => setHydrated(true), []);

  return hydrated;
}
