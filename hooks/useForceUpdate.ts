import { useState } from "react";

export function useForceUpdate() {
  const [, setToggle] = useState<boolean>(false);
  return () => setToggle(t => !t);
}
