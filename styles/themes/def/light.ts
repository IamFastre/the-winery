import { DEFAULT } from ".";
import { Theme } from "../types";

export const LIGHT:Theme = {
  ...DEFAULT,
  name: "light",

  palette: {
    ...DEFAULT.palette,
    primary: "#dedede",
    secondary: "#808080",
    tertiary: "#0c0c0c",
    quaternary: "#ffffff",
    quinary: "#575757",

    accent: "#2aa133",
    highlight: "#743cff",
  },
}
