"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { Theme } from "@/styles/themes/types";


type Wallpaper = Exclude<Theme['other'], undefined>['wallpaper'];

const DefaultAppValue = {
  wallpaper: null as Wallpaper | null,
};

const AppContext = createContext(DefaultAppValue);

export function AppProvider({ children }:{ children:ReactNode }) {
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);

  useEffect(() => {
    const html = document.children[0];
    const style = window.getComputedStyle(html);

    const callback = () => {
      setWallpaper(style.getPropertyValue("--other-wallpaper") as Wallpaper);
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


  const value = {
    wallpaper
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
