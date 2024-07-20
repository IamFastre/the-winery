'use client';
import { humanizeTime } from "@/utils";
import { useHydration } from "@/hooks";

export function Time({ timestamp }: { timestamp: number | string; }) {
  const hydrated = useHydration();
  return (
    <span>
      {humanizeTime(timestamp, !hydrated)}
    </span>
  );
}