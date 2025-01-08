import type { CSSProperties } from "react";

export type Color = Exclude<CSSProperties['color'], undefined>;

export interface Theme {
  name: 'dark' | 'light' | 'scarlatta';
  palette: {
    none: Color;

    primary: Color;
    secondary: Color;
    tertiary: Color;
    quaternary: Color;
    quinary: Color;

    accent: Color;
    highlight: Color;

    hot: Color;
    cold: Color;

    gold: Color;
    wine: Color;
    orange: Color;
    pink: Color;
    purple: Color;

    red: Color;
    green: Color;
    blue: Color;

    cyan: Color;
    yellow: Color;
    magenta: Color;
  }
}
