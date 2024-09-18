import { C } from "@/components/C";

import styles from "./style.module.scss";

interface UsernameHandleProps {
  username: string;
  id?: string;
  className?: string;
}

export function UsernameHandle(props:UsernameHandleProps) {
  return (
    <div className={`${styles.main} ${props.className }`}>
      <a id={props.id} href={`/u/${props.username}`}>
        <C.QUINARY>
          u:
        </C.QUINARY>
        <C.ACCENT>
          {props.username}
        </C.ACCENT>
      </a>
    </div>
  );
}
