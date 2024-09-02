"use client";
import { HTMLAttributes } from "react";

import { humanizeTime } from "@/utils";
import { useHydration } from "@/hooks";

interface HydratedTimeProps {
  timestamp: number | string;
  noSpan?: boolean;
}

export function HydratedTime(props:HydratedTimeProps & HTMLAttributes<HTMLSpanElement>) {
  const hydrated = useHydration();

  if (props.noSpan)
    return humanizeTime(props.timestamp, !hydrated);

  return (
    <span {...props}>
      {humanizeTime(props.timestamp, !hydrated)}
    </span>
  );
}
