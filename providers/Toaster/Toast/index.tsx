import { RiShiningFill } from '@react-icons/all-files/ri/RiShiningFill';
import { IoSkullSharp } from '@react-icons/all-files/io5/IoSkullSharp';
import { IoWarning } from '@react-icons/all-files/io5/IoWarning';
import { IoCheckmarkCircle } from '@react-icons/all-files/io5/IoCheckmarkCircle';

import { ToastWithID } from '../types';

import styles from "./style.module.scss";

export function ToastHolder({ toasts }:{ toasts:ToastWithID[] }) {
  return (
    <div className={styles.toastHolder}>
      {toasts.map(p => (
        <Toast {...p} key={p.id} />
      ))}
    </div>
  );
}

export function Toast(props:ToastWithID) {
  const deathDur = 500;
  const animation = `${styles.popIn} 1s ease-out, ${styles.popOut} ${deathDur}ms ease-in ${props.duration - deathDur}ms forwards`;

  return (
    <div
      className={`${styles.toast} ${styles[props.type!]}`}
      style={{ animation}}
    >
      {
        props.icon ?
          <props.icon />
        : props.type === "info" ?
          <RiShiningFill />
        : props.type === "success" ?
          <IoCheckmarkCircle />
        : props.type === "warning" ?
          <IoWarning />
        : props.type === "error" ?
          <IoSkullSharp />
        : null
      }
      <div className={styles.body}>
        { props.title ? <span className={styles.title}>{props.title}</span> : null }
        <span className={styles.message}>{props.message}</span>
      </div>
    </div>
  );
}