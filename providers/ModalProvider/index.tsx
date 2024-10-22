"use client";
import { useContext, useEffect, useState } from "react";
import hash from "object-hash";

import { SetState } from "@/utils/client";

import { ModalContext } from "./context";
import { ModalContextValue } from "./types";
import { ModalHolder } from "./ModalHolder";
import { CloseButton } from "./CloseButton";

interface ModalProps {
  state: [boolean, SetState<boolean>];
  closeButton?: boolean;
  children?: React.ReactNode;
  animationDuration?: number;
}

function getId(props:any) {
  return hash([JSON.stringify(props), Date.now()])
}

export function Modal(props:ModalProps) {
  const ctx = useContext(ModalContext);
  const [id] = useState<string>(getId(props.state[1]));

  const children = () => (
    <>
      {props.children}
      {props.closeButton && <CloseButton setter={props.state[1]} />}
    </>
  );

  useEffect(() => {
    ctx.setIsOrphan(false);
    return () => ctx.setIsOrphan(true);
  }, []);

  useEffect(() => {
    if (props.state[0])
      ctx.setId(id);
  }, [props.state[0]]);

  useEffect(() => {
    if (ctx.id === id) {
      ctx.setModal(children);
      ctx.setShown(props.state[0]);
      ctx.setAnimationDuration(props.animationDuration);
    }
  }, [props, ctx.id]);

  useEffect(() => {
    if (props.state[0], ctx.id !== id)
      props.state[1]?.(false);
  }, [ctx.id]);

  return null;
}

export function ModalProvider({ children }:{ children:React.ReactNode }) {
  const [id, setId] = useState<string | null>(null);
  const [modal, setModal] = useState<React.ReactNode>(null);
  const [shown, setShown] = useState<boolean>(false);
  const [isOrphan, setIsOrphan] = useState<boolean>(false);
  const [animationDuration, setAnimationDuration] = useState<number | undefined>(undefined);

  const value:ModalContextValue = {
    id,
    setId,
    setModal,
    setShown,
    setIsOrphan,
    setAnimationDuration,
  };

  useEffect(() => {
    if (isOrphan) {
      setId(null);
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
