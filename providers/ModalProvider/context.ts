import { createContext, ReactNode } from "react";
import { SetState } from "@/utils/client";

export const DefaultModalContextValue = {
  id: {} as string | null,
  setId: {} as SetState<string | null>,
  setModal: {} as SetState<ReactNode>,
  setShown: {} as SetState<boolean>,
  setIsOrphan: {} as SetState<boolean>,
  setAnimationDuration: {} as SetState<number | undefined>,
};

export const ModalContext = createContext(DefaultModalContextValue);
