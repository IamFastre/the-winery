import { Theme } from "./types";

export * from "./wallpapers";

export * from "./def/dark";
export * from "./def/light";
export * from "./def/scarlatta";

export function MakeTheme(theme:Theme) {  
  const style = { } as Record<string, string>;

  style['--theme-name'] = theme.name;

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

  return style;
}
