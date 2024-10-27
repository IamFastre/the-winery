import { MouseEventHandler, ReactNode } from "react";
import { IconType } from "react-icons";
import CSS from "csstype";

import { hexOpacity } from "@/utils/funcs";
import { focusable } from "@/utils/client";

import colors from '@/styles/colors.module.scss';
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
      {...focusable(styles.active, !props.disabled ? props.onClick : undefined)}
    >
      {/* This is just cursed */}
      <style jsx> {`
        .${styles.container} {
          border-color: ${color} !important;
          background-color: ${hexOpacity(color, 0.1)} !important;

          &:hover:not(.${styles.disabled}),
          &:focus-visible:not(.${styles.disabled}) {
            background-color: ${hexOpacity(color, 0.2)} !important;
          }

          &:active:not(.${styles.disabled}),
          &.${styles.active}:not(.${styles.disabled}) {
            background-color: ${color} !important;
            filter: drop-shadow(0 0 10px ${hexOpacity(color, 0.5)}) !important;
          }
        }

        .${styles.icon} {
          svg {
            fill: ${props.disabled ? colors.secondary : props.icon?.color ?? colors.tertiary};
            stroke: ${props.disabled ? colors.secondary : props.icon?.color ?? colors.tertiary};
          }
        }
      `}</style>

      {
        props.icon ?
        <div className={`${styles.icon} ${props.iconBackground ? styles.background : ""}`}>
          <props.icon.element size={props.icon.size ?? 30} />
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
