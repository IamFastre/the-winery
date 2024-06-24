import React, { HTMLAttributes } from "react";
import styles from "./styles.module.scss";

export type TextProps = HTMLAttributes<HTMLSpanElement>;

export const C = {
  NONE: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.none} />
  ),

  PRIMARY: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.primary} />
  ),
  SECONDARY: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.secondary} />
  ),
  TERTIARY: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.tertiary} />
  ),
  QUATERNARY: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.quaternary} />
  ),
  QUINARY: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.quinary} />
  ),

  ACCENT: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.accent} />
  ),
  HIGHLIGHT: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.highlight} />
  ),

  HOT: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.hot} />
  ),
  COLD: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.cold} />
  ),

  RED: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.red} />
  ),
  GREEN: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.green} />
  ),
  BLUE: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.blue} />
  ),

  CYAN: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.cyan} />
  ),
  YELLOW: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.yellow} />
  ),
  MAGENTA: (props: TextProps) : React.JSX.Element => (
    <span {...props} className={styles.magenta} />
  ),
};
