import { IconType } from "react-icons";

import styles from "./styles.module.scss";

export function PageIcon({ icon:Icon }: { icon:IconType }) {
  return (
    <div className={styles.pageIcon}>
      <Icon />
    </div>
  );
}
