import { Theme } from "./types";

export const DARK:Theme = {
  name: 'dark',
  palette: {
    none: "transparent",

    primary: "#0a0a0a",
    secondary: "#666666",
    tertiary: "#eeeeee",
    quaternary: "#1f1f1f",
    quinary: "#b0b0b0",

    accent: "#1ed760",
    highlight: "#8400ff",

    hot: "#d71e1e",
    cold: "#2054ff",

    gold: "#ea9a64",
    wine: "#690707",
    orange: "#ff7e0d",
    pink: "#eb4982",
    purple: "#663399",

    red: "#d71e1e",
    green: "#00c43b",
    blue: "#3a7aff",

    cyan: "#27d4ff",
    yellow: "#f8c41b",
    magenta: "#eb16c7",
  },

  styling: {
    'border-radius-1': '0px',
    'border-radius-2': '10%',
  }
}

/* ========================================================================== */

export const LIGHT:Theme = {
  name: 'light',
  palette: {
    none: "transparent",

    primary: "#eeeeee",
    secondary: "#959595",
    tertiary: "#0c0c0c",
    quaternary: "#1f1f1f",
    quinary: "#575757",

    accent: "#00c90f",
    highlight: "#4a00ff",
    
    hot: "#d71e1e",
    cold: "#2054ff",
    
    gold: "#ea9a64",
    wine: "#690707",
    orange: "#ff7e0d",
    pink: "#eb4982",
    purple: "#663399",

    red: "#d71e1e",
    green: "#00c43b",
    blue: "#3a7aff",

    cyan: "#27d4ff",
    yellow: "#f8c41b",
    magenta: "#eb16c7",
  },

  styling: {
    'border-radius-1': '0px',
    'border-radius-2': '10%',
  }
}

/* ========================================================================== */

export const SCARLATTA:Theme = {
  name: 'scarlatta',
  palette: {
    none: "transparent",

    primary: "#341411",
    secondary: "#bd3478",
    tertiary: "#eed0d0",
    quaternary: "#3f1a2c",
    quinary: "#aa4fc1",

    accent: "#5c14e3",
    highlight: "#1F8870",

    hot: "#ff0076",
    cold: "#2B6788",
   
    gold: "#ea9a64",
    wine: "#690707",
    orange: "#ff7e0d",
    pink: "#eb4982",
    purple: "#663399",

    red: "#d71e1e",
    green: "#00c43b",
    blue: "#3a7aff",

    cyan: "#27d4ff",
    yellow: "#f8c41b",
    magenta: "#eb16c7",
  },

  styling: {
    'border-radius-1': '15px',
    'border-radius-2': '50%',
  }
}

export function MakeTheme(theme:Theme) {  
  const style = { } as Record<string, string>;

  Object.keys(theme.palette).forEach(c => {
    style[`--color-${c}`] = (theme.palette as Record<string, string>)[c];
  });

  Object.keys(theme.styling).forEach(v => {
    style[`--value-${v}`] = (theme.styling as Record<string, string>)[v];
  });

  return style;
}