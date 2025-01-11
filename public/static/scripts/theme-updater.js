function GetAvailableThemes() {
  const r = [];
  for (let i = 0; i < document.styleSheets.length; i++) {
    const ss = document.styleSheets[i];
    const owner = ss.ownerNode;
    if (owner.hasAttribute("data-theme-definition")) {
      r.push(owner.getAttribute("data-theme-definition"));
    }
  }

  return r;
}

function UpdateTheme(t = undefined) {
  const all_themes = GetAvailableThemes();
  const theme = t ?? LocalStorage.get("settings:theme");
  document.children[0].setAttribute(
    "data-theme",
    all_themes.includes(theme) ? theme : all_themes[0]
  );
}

UpdateTheme();

addEventListener('storage', e => {
  if (e.key === "settings:theme")
    UpdateTheme();
});
