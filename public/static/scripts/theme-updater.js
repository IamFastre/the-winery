const HTML_THEME_ATTR_NAME = "data-theme";
const HTML_THEME_ATTR_VAR  = "data-theme-variant";

const THEME_DEF_ATTR_NAME = "data-theme-name";
const THEME_DEF_ATTR_VAR  = "data-theme-variant";

const STORAGE_THEME_NAME_ENTRY = "settings:theme";
const STORAGE_THEME_VAR_ENTRY  = "settings:theme-variant";

const html = document.children[0];

function themeify(name, variant) {
  return [undefined, null, "null", "none"].includes(variant) ? name : `${name}:${variant}`;
}

const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && (mutation.attributeName === HTML_THEME_ATTR_NAME || mutation.attributeName === HTML_THEME_ATTR_VAR)) {
      const allThemes = GetAvailableThemes();

      const name = html.getAttribute(HTML_THEME_ATTR_NAME);
      const varr = html.getAttribute(HTML_THEME_ATTR_VAR);
      const theme = themeify(name, varr);

      if (allThemes.includes(theme)) {
        SetTheme(theme);
      } else {
        const [fbName, fbVarr] = allThemes[0].split(':');
        html.setAttribute(HTML_THEME_ATTR_NAME, fbName);
        html.setAttribute(HTML_THEME_ATTR_VAR,  fbVarr);
        SetTheme(allThemes[0]);
      }
    }
  }
});

function GetAvailableThemes() {
  const r = [];
  for (let i = 0; i < document.styleSheets.length; i++) {
    const ss = document.styleSheets[i];
    const owner = ss.ownerNode;
    if (owner.hasAttribute(THEME_DEF_ATTR_NAME)) {
      const name = owner.getAttribute(THEME_DEF_ATTR_NAME);
      const varr = owner.getAttribute(THEME_DEF_ATTR_VAR);

      r.push(themeify(name, varr));
    }
  }

  return r;
}

function UpdateTheme() {
  const allThemes = GetAvailableThemes();
  const name = LocalStorage.get(STORAGE_THEME_NAME_ENTRY);
  const varr = LocalStorage.get(STORAGE_THEME_VAR_ENTRY);
  const t = themeify(name, varr);

  if (allThemes.includes(t)) {
    html.setAttribute(HTML_THEME_ATTR_NAME, name);
    html.setAttribute(HTML_THEME_ATTR_VAR, varr);
  } else {
    const [fbName, fbVarr] = allThemes[0].split(':');
    html.setAttribute(HTML_THEME_ATTR_NAME, fbName);
    html.setAttribute(HTML_THEME_ATTR_VAR, fbVarr);
  }
}

function SetTheme(t) {
  const allThemes = GetAvailableThemes();
  const [name, varr] = (allThemes.includes(t) ? t : allThemes[0]).split(':');
  LocalStorage.set(STORAGE_THEME_NAME_ENTRY, name);
  LocalStorage.set(STORAGE_THEME_VAR_ENTRY,  varr ?? "none");
}

UpdateTheme();
observer.observe(html, { attributes: true });

addEventListener('storage', e => {
  if (e.key === STORAGE_THEME_NAME_ENTRY)
    UpdateTheme();
});
