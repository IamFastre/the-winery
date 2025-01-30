import { Theme } from "../../types";
import { TUII_DARK } from "./dark";

export const TUII_LIGHT:Theme<'tuii'> = {
  ...TUII_DARK,
  variant: "light",

  palette: {
    ...TUII_DARK.palette,
    primary: "#dedede",
    secondary: "#808080",
    tertiary: "#0c0c0c",
    quaternary: "#ffffff",
    quinary: "#575757",

    accent: "#2aa133",
    highlight: "#743cff",
  },
}
