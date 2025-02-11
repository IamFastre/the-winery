"use client";
import { useAppContext } from "@/providers/AppContext";

import { HomeWallpapers } from "@/styles/themes/wallpapers";
import { Theme } from "@/styles/themes/types";

export type Wallpaper = Exclude<Theme['other'], undefined>['home-wallpaper'];

export function HomeWallpaper() {
  const { theme } = useAppContext();
  const W = theme.homeWallpaper ? HomeWallpapers[theme.homeWallpaper] : null;

  return (
    W && <W />
  );
}
