import { DEFAULT } from ".";
import { Theme } from "../types";

export const TUNDRA:Theme = {
  ...DEFAULT,
  name: "tundra",

  palette: {
    ...DEFAULT.palette,
    none: "transparent",

    primary: "#c8dbc9",
    secondary: "#44754e",
    tertiary: "#001500",
    quaternary: "#f0fff0",
    quinary: "#90af90",

    accent: "#21880f",
    highlight: "#fb6900",
  },

  styling: {
    "font-stack": "'Format1452'",

    "border-radius-1": "20px",
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
  }
}
