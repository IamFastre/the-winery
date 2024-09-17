import { IconType } from "react-icons";
import { DefaultToasterValue } from "./context";

export type ToasterValue = typeof DefaultToasterValue;

export type Toast = {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  icon?: IconType;
  duration?: number;
};

export type ToastWithID = Toast & {
  duration:number;
  id: number;
};
