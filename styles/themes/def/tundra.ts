import colors from "@/styles/colors";
import { DEFAULT } from ".";
import { Theme } from "../types";

export const TUNDRA:Theme<'tundra'> = {
  ...DEFAULT,
  name: "tundra",
  variant: "none",

  palette: {
    ...DEFAULT.palette,
    none: "transparent",

    primary: "#c8dbc9",
    secondary: "#44754e",
    tertiary: "#001500",
    quaternary: "#f0fff0",
    quinary: "#5eac5e",

    accent: "#21880f",
    highlight: "#fb6900",
  },

  styling: {
    "font-stack": "'Format1452'",

    "border-radius-1": "25px",
    "border-radius-2": "10px",
    "border-radius-3": "10px",

    "line-ribbon": "'>>>'",

    "bracket-1-l": "'⊱'",
    "bracket-1-r": "'⊰'",
    
    "bracket-2-l": "'▸'",
    "bracket-2-r": "'◂'",

    "bracket-3-l": "''",
    "bracket-3-r": "''",

    "arrow-1-l": "'#'",
    "arrow-1-r": "'#'",
  },

  other: {
    wallpaper: 'foresta',
  },

  custom: {
    'navbar': `
      background-color: ${colors.secondary};
      &:hover { border-color: ${colors.secondary}; }
    `,

    'navbar-icon': `
      color: ${colors.primary};
      &:hover { color: ${colors.quaternary}; }
      &.current { color: ${colors.highlight}; }
    `
  }
}
