import { createContext } from "react";
import { Toast } from "./types";

export const DefaultToasterValue = {
  add: {} as (toast:Toast) => void,
  duration: {} as number,
};

export type ToasterValue = typeof DefaultToasterValue;
export const ToasterContext = createContext(DefaultToasterValue);