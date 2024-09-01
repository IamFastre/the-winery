import { IoClose } from "react-icons/io5";
import { focusable, SetState } from "@/utils";

import styles from "./style.module.scss";

interface CloseButtonProps{
  setter: SetState<boolean>;
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
