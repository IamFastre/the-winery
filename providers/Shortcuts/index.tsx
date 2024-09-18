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

export function useShortcuts(shortcuts:Shortcut[]) {
  const context = useContext(ShortcutsContext);

  useEffect(() => {
    shortcuts.forEach(s => context.add(s));
    return () => shortcuts.forEach(s => context.remove(s));
  }, []);
}

export function Shortcuts({ children }:{ children:React.ReactNode }) {
  const [alt, setAlt] = useState<boolean>(false);
  const [ctrl, setCtrl] = useState<boolean>(false);
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
      if (e.key === 'Alt')     setAlt(true);
      if (e.key === 'Control') setCtrl(true);
    };

    const onKeyUp = (e:KeyboardEvent) => {
      if (e.key === 'Alt')     setAlt(false);
      if (e.key === 'Control') setCtrl(false);
    }

    document.body.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    
    return () => {
      document.body.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e:KeyboardEvent) => {
      for (var shortcut of shortcuts) {
        const altDown = shortcut.alt ?? false;
        const ctrlDown = shortcut.ctrl ?? false;

        if (e.key === shortcut.key && alt === altDown && ctrl === ctrlDown) {
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
  }, [shortcuts, alt, ctrl]);

  return (
    <>
      <ShortcutsContext.Provider value={{ alt, ctrl, shortcuts, add, remove }}>
        {children}
      </ShortcutsContext.Provider>
    </>
  );
}
