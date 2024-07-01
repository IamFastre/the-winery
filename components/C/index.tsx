import React, { HTMLAttributes } from "react";
import colors from '@/styles/colors.module.scss';


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
    <span {...props} style={{color: colors.none}} />
  ),

  PRIMARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.primary}} />
  ),
  SECONDARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.secondary}} />
  ),
  TERTIARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.tertiary}} />
  ),
  QUATERNARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.quaternary}} />
  ),
  QUINARY: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.quinary}} />
  ),

  ACCENT: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.accent}} />
  ),
  HIGHLIGHT: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.highlight}} />
  ),

  HOT: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.hot}} />
  ),
  COLD: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.cold}} />
  ),

  RED: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.red}} />
  ),
  GREEN: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.green}} />
  ),
  BLUE: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.blue}} />
  ),

  CYAN: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.cyan}} />
  ),
  YELLOW: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.yellow}} />
  ),
  MAGENTA: (props: SpanProps) : React.JSX.Element => (
    <span {...props} style={{color: colors.magenta}} />
  ),
};
