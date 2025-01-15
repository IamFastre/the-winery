"use client";
import { useLayoutEffect, useState } from "react";

import { Flowery } from "@/styles/themes";
import { Theme } from "@/styles/themes/types";

type Wallpaper = Exclude<Theme['other'], undefined>['wallpaper'];

export function ThemeWallpaper() {
  const [theme, setTheme] = useState<Wallpaper | null>(null);

  useLayoutEffect(() => {
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

  return (
    theme === 'flowery'
    ? <Flowery />
    : null
  );
}