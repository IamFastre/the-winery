"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { Theme } from "@/styles/themes/types";


type ThemeVariant = Exclude<Theme['variant'], undefined>;
type HomeWallpaper = Exclude<Theme['other'], undefined>['home-wallpaper'];

const DefaultAppValue = {
  theme: {
    name: null as Theme['name'] | null,
    variant: null as ThemeVariant | null,
    homeWallpaper: null as HomeWallpaper | null,
  }
};

const AppContext = createContext(DefaultAppValue);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }:{ children:ReactNode }) {
  const [name, setName] = useState<Theme['name'] | null>(null);
  const [variant, setVariant] = useState<ThemeVariant | null>(null);
  const [homeWallpaper, setHomeWallpaper] = useState<HomeWallpaper | null>(null);

  useEffect(() => {
    const html = document.children[0];
    const style = window.getComputedStyle(html);

    const callback = () => {
      setName(style.getPropertyValue("--theme-name") as Theme['name']);
      setVariant(style.getPropertyValue("--theme-variant") as ThemeVariant);
      setHomeWallpaper(style.getPropertyValue("--other-wallpaper") as HomeWallpaper);
    };

    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && (mutation.attributeName === "data-theme" || mutation.attributeName === "data-theme-variant")) {
          callback();
        }
      }
    });

    callback();
    observer.observe(html, { attributes: true });
    return () => observer.disconnect();
  }, []);


  const value:typeof DefaultAppValue = {
    theme: {
      name,
      variant,
      homeWallpaper
    }
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
