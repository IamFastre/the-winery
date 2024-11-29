import { IoClose } from "@icons/io5/IoClose";
import { focusable, SetState } from "@/utils/client";

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
