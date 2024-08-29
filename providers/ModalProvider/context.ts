import { createContext, Dispatch, ReactNode, SetStateAction } from "react";

export const DefaultModalContextValue = {
  setModal: {} as Dispatch<SetStateAction<ReactNode>>,
  setShown: {} as Dispatch<SetStateAction<boolean>>,
  setIsOrphan: {} as Dispatch<SetStateAction<boolean>>,
  setAnimationDuration: {} as Dispatch<SetStateAction<number | undefined>>,
};

export const ModalContext = createContext(DefaultModalContextValue);
