import { KeyboardEventHandler, MouseEventHandler } from "react";
import { IconType } from "react-icons";

import colors from '@/styles/colors.module.scss';
import styles from "./style.module.scss";

interface Icon {
  element: IconType;
  color?: string;
  size?: number;
  position?: "left" | "right" | "none";
}

export interface ButtonProps {
  title?:string;
  icon?: Icon;
  onClick?: MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
}

export function Button(props:Readonly<ButtonProps>) {
  const iconPos = props.icon?.position ?? "left";
  const icon    = props.icon && props.icon.position !== "none" ? (
    <div className={styles.icon}>
      <props.icon.element
        color={props.disabled ? colors.secondary : props.icon.color ?? colors.accent}
        size={props.icon.size ?? 30}
      />
    </div>) : null;

  const keydown:KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === 'Enter')
      e.currentTarget.classList.add(styles.active);
  };

  const keyup:KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === 'Enter') {
      e.currentTarget.classList.remove(styles.active);
      e.currentTarget.click();
    }
  };

  return (
    <div
      className={`${styles.container} ${props.disabled ? styles.disabled : ""}`}
      onClick={!props.disabled ? props.onClick : undefined}
      onKeyDown={keydown}
      onKeyUp={keyup}
      tabIndex={0}
    >
      { props.icon && iconPos === "left" ? icon : null }

      <div className={styles.textHolder}>
        <span>
          <span className={styles.brackets}>{'[ '}</span>
          {props.title}
          <span className={styles.brackets}>{' ]'}</span>
        </span>
      </div>

      { props.icon && iconPos === "right" ? icon : null }
    </div>
  );
}
