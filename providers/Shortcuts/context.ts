import { createContext } from "react";
import { Shortcut } from "./types";

export const DefaultShortcutsContextValue = {
  alt: false,
  ctrl: false,
  shortcuts: {} as Shortcut[],
  add: {} as (sc:Shortcut) => void,
  remove: {} as (sc:Shortcut) => void,
};

export const ShortcutsContext = createContext(DefaultShortcutsContextValue);