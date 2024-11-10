"use client";
import { useContext, useEffect, useState } from "react";
import hash from "object-hash";

import { ShortcutsContext } from "./context";
import { CallbackShortcut, ClickShortcut, Shortcut } from "./types";

export function useShortcut(shortcut:Shortcut) {
  const context = useContext(ShortcutsContext);

  useEffect(() => {
    context.add(shortcut);
    return () => context.remove(shortcut);
  }, []);
}

export function useShortcuts(shortcuts:Shortcut[], deps?:any[]) {
  const context = useContext(ShortcutsContext);
  
  if (deps) {
    shortcuts.push({ key: null, deps } as unknown as Shortcut)
  }

  useEffect(() => {
    shortcuts.forEach(s => context.add(s));
    return () => shortcuts.forEach(s => context.remove(s));
  }, []);
}

export function Shortcuts({ children }:{ children:React.ReactNode }) {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  const add = (sc:Shortcut) => {
    setShortcuts(old =>
      old.concat(sc)
    );
  };

  const remove = (sc:Shortcut) => {
    setShortcuts(old => 
      old.filter(s => hash(s) !== hash(sc))
    );
  };

  useEffect(() => {
    const onKeyDown = (e:KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        if (shortcut.key === null)
          continue;

        const altDown = shortcut.alt ?? false;
        const ctrlDown = shortcut.ctrl ?? false;

        if (e.key === shortcut.key && e.altKey === altDown && e.ctrlKey === ctrlDown) {
          e.preventDefault();
          if ((shortcut as CallbackShortcut).callback)
            (shortcut as CallbackShortcut).callback();
          else if ((shortcut as ClickShortcut).clickableId)
            document.getElementById((shortcut as ClickShortcut).clickableId)?.click();
        }
      }
    };

    document.body.addEventListener('keydown', onKeyDown);
    return () => document.body.removeEventListener('keydown', onKeyDown);
  }, [shortcuts]);

  return (
    <>
      <ShortcutsContext.Provider value={{ shortcuts, add, remove }}>
        {children}
      </ShortcutsContext.Provider>
    </>
  );
}
