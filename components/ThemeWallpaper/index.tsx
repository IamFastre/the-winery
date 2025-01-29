"use client";
import { useAppContext } from "@/providers/AppContext";

import Wallpapers from "@/styles/themes/wallpapers";
import { Theme } from "@/styles/themes/types";

export type Wallpaper = Exclude<Theme['other'], undefined>['wallpaper'];

export function ThemeWallpaper() {
  const { theme } = useAppContext();
  const W = theme.wallpaper ? Wallpapers[theme.wallpaper] : null;

  return (
    W && <W />
  );
}
