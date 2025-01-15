import { Theme } from "../types";

export const DARK:Theme = {
  name: "dark",
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
    "font-stack": "'Cascadia', 'Menlo', 'Courier Prime', 'Courier New', Courier, monospace",
    "border-radius-1": "0px",
    "border-radius-2": "10%",
    "bracket-l": "'{'",
    "bracket-r": "'}'",
    "line-ribbon": "'<#>'",
  }
}
