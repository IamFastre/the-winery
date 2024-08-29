"use client";
import { useEffect, useState } from "react";

import styles from "./style.module.scss";

interface ModalHolderProps {
  shown: boolean;
  modal: React.ReactNode;
  animationDuration?: number;
}

export function ModalHolder(props:ModalHolderProps) {
  const duration = props.animationDuration ?? 500;
  const appearAnim = `${styles.appear} ${duration}ms ease-in-out forwards`;
  const disappearAnim = `${styles.disappear} ${duration}ms ease-in-out forwards`;

  const [dead, setDead] = useState<boolean>(true);

  useEffect(() => {
    if (props.shown)
      setDead(false);
    else
      setTimeout(() => {
        setDead(true);
      }, duration);
  }, [props.shown])

  if (dead && !props.shown)
    return null;

  return (
    <div className={styles.modalHolder} style={{ animation: props.shown ? appearAnim : disappearAnim }}>
      {props.modal}
    </div>
  );
}
