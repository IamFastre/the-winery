import { IconType } from "react-icons";

export type Toast = {
  message: string;
  type?: "info" | "warning" | "error";
  title?: string;
  icon?: IconType;
  duration?: number;
};

export type ToastWithID = Toast & { duration:number; id: number; };
