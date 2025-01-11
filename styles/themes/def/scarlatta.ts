import { Theme } from "../types";
import { Scarlatta as Wallpaper } from "./wallpapers";

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
    'font-stack': "'Ubuntu', 'Segoe UI', Roboto, 'Open Sans', 'Helvetica Neue', sans-serif",
    'border-radius-1': '15px',
    'border-radius-2': '50%',
    'bracket-l': '"ʚ"',
    'bracket-r': '"ɞ"',
    'line-ribbon': '".•˚ʚ♡ɞ˚•."',
  },

  components: {
    Wallpaper,
  },
}
