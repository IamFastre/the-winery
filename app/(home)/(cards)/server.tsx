import { IconType } from "@react-icons/all-files";

import styles from "./styles.module.scss";

export function PageIcon({ icon:Icon }: { icon:IconType }) {
  return (
    <div className={styles.pageIcon}>
      <Icon />
    </div>
  );
}
