import type { Dispatch, SetStateAction } from "react";

export type LogoKind = "main" | "brand" | "mono" | "brand-outline" | "mono-outline" | "touch";
export type SetState<T> = Dispatch<SetStateAction<T>>;
