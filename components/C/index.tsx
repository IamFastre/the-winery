import React, { HTMLAttributes } from "react";
import styles from "./styles.module.scss";

export type SpanProps      = HTMLAttributes<HTMLSpanElement>;
export type UnderlineProps = SpanProps & { underlineColor?: string };

/* =============================== Underlines =============================== */

export const U = (props: UnderlineProps) : React.JSX.Element => (
  <span {...props} style={{ textDecoration: 'underline', textDecorationStyle: 'dotted', textDecorationColor: props.underlineColor, ...props.style }} />
);

export const DU = (props: UnderlineProps) : React.JSX.Element => (
  <span {...props} style={{ textDecoration: 'underline', textDecorationStyle: 'dotted', textDecorationColor: props.underlineColor, ...props.style }} />
);

export const WU = (props: UnderlineProps) : React.JSX.Element => (
  <span {...props} style={{ textDecoration: 'underline', textDecorationStyle: 'wavy', textDecorationColor: props.underlineColor, ...props.style }} />
);

/* ================================= Weights ================================ */

export const L = (props: SpanProps) : React.JSX.Element => (
  <span {...props} style={{ fontWeight: '100', ...props.style }} />
);

export const R = (props: SpanProps) : React.JSX.Element => (
  <span {...props} style={{ fontWeight: '100', ...props.style }} />
);

export const B = (props: SpanProps) : React.JSX.Element => (
  <span {...props} style={{ fontWeight: '900', ...props.style }} />
);

/* ================================= Italics ================================ */

export const LI = (props: SpanProps) : React.JSX.Element => (
  <span {...props} style={{ fontStyle: 'italic', fontWeight: '100', ...props.style }} />
);

export const RI = (props: SpanProps) : React.JSX.Element => (
  <span {...props} style={{ fontStyle: 'italic', fontWeight: '100', ...props.style }} />
);

export const BI = (props: SpanProps) : React.JSX.Element => (
  <span {...props} style={{ fontStyle: 'italic', fontWeight: '900', ...props.style }} />
);

/* ================================= Colors ================================= */
export const C = {
  NONE: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.none} ${props.className}`} />
  ),

  PRIMARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.primary} ${props.className}`} />
  ),
  SECONDARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.secondary} ${props.className}`} />
  ),
  TERTIARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.tertiary} ${props.className}`} />
  ),
  QUATERNARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.quaternary} ${props.className}`} />
  ),
  QUINARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.quinary} ${props.className}`} />
  ),

  ACCENT: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.accent} ${props.className}`} />
  ),
  HIGHLIGHT: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.highlight} ${props.className}`} />
  ),

  HOT: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.hot} ${props.className}`} />
  ),
  COLD: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.cold} ${props.className}`} />
  ),

  RED: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.red} ${props.className}`} />
  ),
  GREEN: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.green} ${props.className}`} />
  ),
  BLUE: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.blue} ${props.className}`} />
  ),

  CYAN: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.cyan} ${props.className}`} />
  ),
  YELLOW: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.yellow} ${props.className}`} />
  ),
  MAGENTA: (props: SpanProps) : React.JSX.Element => (
    <span {...props} className={`${styles.magenta} ${props.className}`} />
  ),
};
