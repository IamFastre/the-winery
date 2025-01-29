import { MakeTheme } from "./themes";
import { Theme } from "./themes/types";

export function ThemeStyle({ theme }:{ theme:Theme }) {
  const s = MakeTheme(theme);
  const selector = `[data-theme=${theme.name}]`
                 + (theme.variant ? `[data-theme-variant=${theme.variant}]` : '');

  return (
    <style
      suppressHydrationWarning
      data-theme-name={theme.name}
      data-theme-variant={theme.variant}
      dangerouslySetInnerHTML={{
        __html: `${selector} { ${Object.keys(s).map(v =>
          v.startsWith(".")
          ? `${v} { ${s[v]} }`
          : `${v}: ${s[v]};`).join(' ')
        } }`
      }}
    />
  );
}
