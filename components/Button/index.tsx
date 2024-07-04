import { KeyboardEventHandler, MouseEventHandler } from "react";
import { IconType } from "react-icons";
import CSS from "csstype";

import colors from '@/styles/colors.module.scss';
import styles from "./style.module.scss";
import { focusable, hexOpacity } from "@/utils";


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
  color?: CSS.Property.Color;
}

export function Button(props:Readonly<ButtonProps>) {
  const color   = props.disabled ? colors.secondary : props.color ?? colors.accent;
  const iconPos = props.icon?.position ?? "left";
  const icon    = props.icon && props.icon.position !== "none" ? (
    <div className={styles.icon}>
      <props.icon.element
        color={props.disabled ? colors.secondary : props.icon.color ?? colors.accent}
        size={props.icon.size ?? 30}
      />
    </div>) : null;

  return (
    <div
      className={`${styles.container} ${props.disabled ? styles.disabled : ""}`}
      {...focusable(styles.active)}
      onClick={!props.disabled ? props.onClick : undefined}
    >
      {/* This is just cursed */}
      <style jsx> {`
        .${styles.container} {
          border-color: ${color};
          background-color: ${hexOpacity(color, 0.1)};

          &:hover:not(.${styles.disabled}),
          &:focus-visible:not(.${styles.disabled}) {
            background-color: ${hexOpacity(color, 0.2)};
          }

          &:active:not(.${styles.disabled}),
          &.${styles.active}:not(.${styles.disabled}) {
            background-color: ${color};
            filter: drop-shadow(0 0 10px ${hexOpacity(color, 0.5)});
          }
        }
      `}</style>

      { props.icon && iconPos === "left" ? icon : null }
      <div className={styles.textHolder}>
        <span>
          <span style={{ color }}>{'[ '}</span>
          {props.title}
          <span style={{ color }}>{' ]'}</span>
        </span>
      </div>
      { props.icon && iconPos === "right" ? icon : null }
    </div>
  );
}
