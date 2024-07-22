import { RiShiningFill } from 'react-icons/ri';
import { IoSkullSharp, IoWarning } from 'react-icons/io5';

import { Toast as Props, ToastType, ToastWithID } from '../types';

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

export function Toast(props:Props) {
  return (
    <div
      className={`${styles.toast} ${styles[props.type!]}`}
      style={{ animation: `${styles.popIn} 1s ease-out, ${styles.popOut} 1s ease-in ${(props?.duration ?? 6000) - 750}ms`}}
    >
      {
        props.icon ?
          <props.icon />
        : props.type === ToastType.info ?
          <RiShiningFill />
        : props.type === ToastType.warning ?
          <IoWarning />
        : props.type === ToastType.error ?
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