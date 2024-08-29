import { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";

import styles from "./style.module.scss";
import { focusable } from "@/utils";

interface CloseButtonProps{
  setter: Dispatch<SetStateAction<boolean>>;
}

export function CloseButton(props:CloseButtonProps) {
  const handleClick = () => {
    props.setter(false);
  };

  return (
    <div className={styles.closeButton} {...focusable(styles.active, handleClick)}>
      <IoClose />
    </div>
  );
}
