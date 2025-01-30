import { Theme } from "../../types";
import { SCARLATTA_WINE } from "./wine";

export const SCARLATTA_ROSE:Theme<'scarlatta'> = {
  ...SCARLATTA_WINE,
  variant: "rose",

  palette: {
    ...SCARLATTA_WINE.palette,
    primary: "#db90be",
    secondary: "#630e2d",
    tertiary: "#3f0a29",
    quaternary: "#c2548a",
    quinary: "#7e0f61",

    accent: "#5c14e3",
    highlight: "#1F8870",

    hot: "#ff0076",
    cold: "#2B6788",

    gold: "#e36917",
  },
}
