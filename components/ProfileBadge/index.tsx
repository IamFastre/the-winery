"use client";
import { useState } from "react";

import { focusable } from "@/utils/client";
import { MenuModal } from "@/components/Modals";
import { Modal } from "@/providers/ModalProvider";

import styles from "./style.module.scss";

interface ProfileBadgeProps {
  children: React.ReactNode;
  condition?: boolean;
  title: string;
  description: React.ReactNode;
}

export function ProfileBadge(props:ProfileBadgeProps) {
  const modalShown = useState<boolean>(false);

  if (props.condition === false)
    return null;

  return (
    <>
      <div className={styles.badge} {...focusable(styles.active, () => modalShown[1](s => !s))}>
        {props.children}
      </div>
      
      <Modal state={modalShown}>
        <MenuModal
          title={props.title}
          alignTitle="center"
          close={() => modalShown[1](false)}
          closeButton="top"
        >
          {props.description}
        </MenuModal>
      </Modal>
    </>
  );
}