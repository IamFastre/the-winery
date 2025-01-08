import React, { HTMLAttributes } from "react";
import colors from "@/styles/colors";


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
  <span {...props} style={{ fontWeight: '400', ...props.style }} />
);

export const B = (props: SpanProps) : React.JSX.Element => (
  <span {...props} style={{ fontWeight: '700', ...props.style }} />
);

/* ================================= Italics ================================ */

export const LI = (props: SpanProps) : React.JSX.Element => (
  <span {...props} style={{ fontStyle: 'italic', fontWeight: '100', ...props.style }} />
);

export const RI = (props: SpanProps) : React.JSX.Element => (
  <span {...props} style={{ fontStyle: 'italic', fontWeight: '400', ...props.style }} />
);

export const BI = (props: SpanProps) : React.JSX.Element => (
  <span {...props} style={{ fontStyle: 'italic', fontWeight: '900', ...props.style }} />
);

/* ================================= Colors ================================= */

export const C = {
  NONE: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.none, ...props.style }} />
  ),

  PRIMARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.primary, ...props.style }} />
  ),
  SECONDARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.secondary, ...props.style }} />
  ),
  TERTIARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.tertiary, ...props.style }} />
  ),
  QUATERNARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.quaternary, ...props.style }} />
  ),
  QUINARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.quinary, ...props.style }} />
  ),

  ACCENT: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.accent, ...props.style }} />
  ),
  HIGHLIGHT: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.highlight, ...props.style }} />
  ),

  HOT: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.hot, ...props.style }} />
  ),
  COLD: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.cold, ...props.style }} />
  ),

  GOLD: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.gold, ...props.style }} />
  ),
  WINE: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.wine, ...props.style }} />
  ),
  ORANGE: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.orange, ...props.style }} />
  ),

  RED: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.red, ...props.style }} />
  ),
  GREEN: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.green, ...props.style }} />
  ),
  BLUE: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.blue, ...props.style }} />
  ),

  CYAN: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.cyan, ...props.style }} />
  ),
  YELLOW: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.yellow, ...props.style }} />
  ),
  MAGENTA: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{ color: colors.magenta, ...props.style }} />
  ),
};
