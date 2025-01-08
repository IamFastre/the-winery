import { MouseEventHandler, ReactNode } from "react";
import { IconType } from "@react-icons/all-files";
import CSS from "csstype";

import { focusable } from "@/utils/client";

import colors from "@/styles/colors";
import styles from "./style.module.scss";


interface Icon {
  element: IconType;
  color?: string;
  size?: number;
}

export interface ButtonProps {
  title?:ReactNode;
  icon?: Icon;
  onClick?: MouseEventHandler<HTMLDivElement>;
  color?: CSS.Property.Color;
  className?: string;
  disabled?: boolean;
  noMinimum?: boolean;
  noBrackets?: boolean;
  iconBackground?: boolean;
}

export function Button(props:Readonly<ButtonProps>) {
  const color   = props.disabled ? colors.secondary : props.color ?? colors.accent;

  return (
    <div
      className={`${styles.container} ${props.disabled ? styles.disabled : ""} ${props.noMinimum ? styles.noMin : ""} ${props.className}`}
      style={{ '--button-color': color } as Record<string, string>}
      {...focusable(styles.active, !props.disabled ? props.onClick : undefined)}
    >
      {
        props.icon ?
        <div className={`${styles.icon} ${props.iconBackground ? styles.background : ""}`}>
          <props.icon.element
            size={props.icon.size ?? 30}
            color={props.disabled ? colors.secondary : props.icon?.color ?? colors.tertiary}
          />
        </div>
        : null
      }
      {
        props.title ?
        <div className={styles.textHolder}>
          <span>
            { props.noBrackets ? null : <span style={{ color }}>{'[ '}</span> }
            {props.title}
            { props.noBrackets ? null : <span style={{ color }}>{' ]'}</span> }
          </span>
        </div>
        : null
      }
    </div>
  );
}
