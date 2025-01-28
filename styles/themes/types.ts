import type { CSSProperties } from "react";
import Wallpapers from "./wallpapers";
import { options } from "@/utils/consts";

export type Color = Exclude<CSSProperties['color'], undefined>;

export interface Theme {
  name: typeof options['settings']['theme'][number];

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
  };

  styling: {
    'font-stack': string;
    
    'border-radius-1': `${number}${'px' | '%'}`;
    'border-radius-2': `${number}${'px' | '%'}`;
    'border-radius-3': `${number}${'px' | '%'}`;

    'line-ribbon': `"${string}"` | `'${string}'`;

    'bracket-1-l': `"${string}"` | `'${string}'`;
    'bracket-1-r': `"${string}"` | `'${string}'`;

    'bracket-2-l': `"${string}"` | `'${string}'`;
    'bracket-2-r': `"${string}"` | `'${string}'`;

    'bracket-3-l': `"${string}"` | `'${string}'`;
    'bracket-3-r': `"${string}"` | `'${string}'`;

    'arrow-1-l': `"${string}"` | `'${string}'`;
    'arrow-1-r': `"${string}"` | `'${string}'`;
  };

  other?: {
    wallpaper: keyof typeof Wallpapers;
  };
}
