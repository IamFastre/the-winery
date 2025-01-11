import { MakeTheme } from "./themes";
import { Theme } from "./types";

export function ThemeUpdater() {
  return (
    <script src="/static/scripts/theme-updater.js" />
  );
}

export function ThemeStyle({ theme }:{ theme:Theme }) {
  const s = MakeTheme(theme);
  return (
    <style
      suppressHydrationWarning
      data-theme-definition={theme.name}
      dangerouslySetInnerHTML={{
        __html: `[data-theme=${theme.name}] { ${Object.keys(s).map(v => `${v}: ${s[v]};`).join(' ')} }`
      }}
    />
  );
}
