import { MakeTheme } from "./themes";
import { Theme } from "./themes/types";

export function ThemeStyle({ theme }:{ theme:Theme }) {
  const s = MakeTheme(theme);
  return (
    <style
      suppressHydrationWarning
      data-theme-definition={theme.name}
      dangerouslySetInnerHTML={{
        __html: `[data-theme=${theme.name}] { ${Object.keys(s).map(v =>
          v.startsWith(".")
          ? `${v} { ${s[v]} }`
          : `${v}: ${s[v]};`).join(' ')
        } }`
      }}
    />
  );
}
