import { DEFAULT } from "..";
import { Theme } from "../../types";

export const SCARLATTA_WINE:Theme<'scarlatta'> = {
  ...DEFAULT,
  name: "scarlatta",
  variant: "wine",

  palette: {
    ...DEFAULT.palette,
    primary: "#341411",
    secondary: "#bd3478",
    tertiary: "#eed0d0",
    quaternary: "#3f1a2c",
    quinary: "#aa4fc1",

    accent: "#5c14e3",
    highlight: "#1F8870",

    hot: "#ff0076",
    cold: "#2B6788",
  },

  styling: {
    "font-stack": "'Ubuntu', 'Segoe UI', Roboto, 'Open Sans', 'Helvetica Neue', sans-serif",

    "border-radius-1": "15px",
    "border-radius-2": "50%",
    "border-radius-3": "50px",

    "line-ribbon": "'.•˚ʚ♡ɞ˚•.'",

    "bracket-1-l": "'ʚ'",
    "bracket-1-r": "'ɞ'",

    "bracket-2-l": "'•'",
    "bracket-2-r": "'•'",

    "bracket-3-l": "''",
    "bracket-3-r": "''",

    "arrow-1-l": "'✿'",
    "arrow-1-r": "'✿'",
  },

  other: {
    wallpaper: "flowery",
  },
}
