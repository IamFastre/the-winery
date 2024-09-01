"use client";
import { useContext, useEffect, useState } from "react";
import { SetState } from "@/utils";

import { ModalContext } from "./context";
import { ModalContextValue } from "./types";
import { ModalHolder } from "./ModalHolder";
import { CloseButton } from "./CloseButton";

interface ModalProps {
  shown: boolean;
  setShown?: SetState<boolean>;
  children?: React.ReactNode;
  animationDuration?: number;
}

export function Modal(props:ModalProps) {
  const ctx = useContext(ModalContext);

  const children = () => (
    <>
      {props.children}
      {props.setShown && <CloseButton setter={props.setShown} />}
    </>
  );

  useEffect(() => {
    return () => {
      ctx.setIsOrphan(true);
    }
  }, [])

  useEffect(() => {
    ctx.setModal(children);
    ctx.setShown(props.shown);
    ctx.setAnimationDuration(props.animationDuration);
  }, [props]);

  return null;
}

export function ModalProvider({ children }:{ children:React.ReactNode }) {
  const [modal, setModal] = useState<React.ReactNode>(null);
  const [shown, setShown] = useState<boolean>(false);
  const [isOrphan, setIsOrphan] = useState<boolean>(false);
  const [animationDuration, setAnimationDuration] = useState<number | undefined>(undefined);

  const value:ModalContextValue = {
    setModal,
    setShown,
    setIsOrphan,
    setAnimationDuration,
  };

  useEffect(() => {
    if (isOrphan) {
      setModal(null);
      setShown(false);
      setIsOrphan(false);
      setAnimationDuration(0);
    }
  }, [isOrphan])

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
