"use client";
import { useContext, useEffect, useState } from "react";

import { ModalContext } from "./context";
import { ModalContextValue } from "./types";
import { ModalHolder } from "./ModalHolder";

interface ModalProps {
  shown: boolean;
  children?: React.ReactNode;
}

export function Modal(props:ModalProps) {
  const ctx = useContext(ModalContext);

  useEffect(() => {
    console.log(props)
    ctx.setModal(props.children);
    ctx.setShown(props.shown);
  }, [props]);

  return null;
}

export function ModalProvider({ children }:{ children:React.ReactNode }) {
  const [modal, setModal] = useState<React.ReactNode>(null);
  const [shown, setShown] = useState<boolean>(false);
  const [animationDuration, setAnimationDuration] = useState<number | undefined>(undefined);

  const value:ModalContextValue = {
    setModal,
    setShown,
    setAnimationDuration,
  };

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
        <ModalHolder
          shown={shown}
          modal={modal}
          animationDuration={animationDuration}
        />
      </ModalContext.Provider>
    </>
  );
}
