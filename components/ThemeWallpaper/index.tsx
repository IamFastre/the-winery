"use client";
import { useAppContext } from "@/providers/AppContext";

import Wallpapers from "@/styles/themes/wallpapers";
import { Theme } from "@/styles/themes/types";

export type Wallpaper = Exclude<Theme['other'], undefined>['wallpaper'];

export function ThemeWallpaper() {
  const { wallpaper:wp } = useAppContext();
  const W = wp ? Wallpapers[wp] : null;

  return (
    W && <W />
  );
}
