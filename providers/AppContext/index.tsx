"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { Theme } from "@/styles/themes/types";


type ThemeVariant = Exclude<Theme['variant'], undefined>;
type Wallpaper = Exclude<Theme['other'], undefined>['wallpaper'];

const DefaultAppValue = {
  theme: {
    name: null as Theme['name'] | null,
    variant: null as ThemeVariant | null,
    wallpaper: null as Wallpaper | null,
  }
};

const AppContext = createContext(DefaultAppValue);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }:{ children:ReactNode }) {
  const [name, setName] = useState<Theme['name'] | null>(null);
  const [variant, setVariant] = useState<ThemeVariant | null>(null);
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);

  useEffect(() => {
    const html = document.children[0];
    const style = window.getComputedStyle(html);

    const callback = () => {
      setName(style.getPropertyValue("--theme-name") as Theme['name']);
      setVariant(style.getPropertyValue("--theme-variant") as ThemeVariant);
      setWallpaper(style.getPropertyValue("--other-wallpaper") as Wallpaper);
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


  const value = {
    theme: {
      name,
      variant,
      wallpaper
    }
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
