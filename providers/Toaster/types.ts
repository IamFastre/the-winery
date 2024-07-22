import { IconType } from "react-icons";

export enum ToastType {
  info = "info",
  warning = "warning",
  error = "error",
}

export type Toast = {
  message: string;
  type?: ToastType;
  title?: string;
  icon?: IconType;
  duration?: number;
};

export type ToastWithID = Toast & { id: number };
