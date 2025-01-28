"use client";
import { useEffect, useState } from "react";

import Wallpapers from "@/styles/themes/wallpapers";
import { Theme } from "@/styles/themes/types";

type Wallpaper = Exclude<Theme['other'], undefined>['wallpaper'];

export function ThemeWallpaper() {
  const [theme, setTheme] = useState<Wallpaper | null>(null);

  useEffect(() => {
    const html = document.children[0];
    const style = window.getComputedStyle(html);

    const callback = () => {
      setTheme(style.getPropertyValue("--other-wallpaper") as Wallpaper);
    };

    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === "data-theme") {
          callback();
        }
      }
    });

    callback();
    observer.observe(html, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const W = theme ? Wallpapers[theme] : null;

  return (
    W && <W />
  );
}
