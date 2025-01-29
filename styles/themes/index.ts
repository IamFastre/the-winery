import { Theme } from "./types";

export * from "./def/tuii/dark";
export * from "./def/tuii/light";
export * from "./def/scarlatta";
export * from "./def/tundra";

export function MakeTheme(theme:Theme) {  
  const style = { } as Record<string, string>;

  style['--theme-name'] = theme.name;
  style['--theme-variant'] = theme.variant ?? "none";

  Object.keys(theme.palette).forEach(c => {
    style[`--color-${c}`] = (theme.palette as Record<string, string>)[c];
  });

  Object.keys(theme.styling).forEach(v => {
    style[`--value-${v}`] = (theme.styling as Record<string, string>)[v];
  });

  if (theme.other)
    Object.keys(theme.other).forEach(v => {
      style[`--other-${v}`] = (theme.other as Record<string, string>)[v];
    });

  if (theme.custom)
    Object.keys(theme.custom).forEach(v => {
      style[`.${v}`] = (theme.custom as Record<string, string>)[v];
    });

  return style;
}
