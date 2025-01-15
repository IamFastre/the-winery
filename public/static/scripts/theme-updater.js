const HTML_THEME_ATTR_NAME = "data-theme";
const THEME_DEF_ATTR_NAME  = "data-theme-definition";
const STORAGE_THEME_ENTRY  = "settings:theme";

const html = document.children[0];

const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === HTML_THEME_ATTR_NAME) {
      const theme = html.getAttribute(HTML_THEME_ATTR_NAME);
      const allThemes = GetAvailableThemes();

      if (allThemes.includes(theme)) {
        SetTheme(theme);
      } else {
        html.setAttribute(HTML_THEME_ATTR_NAME, allThemes[0]);
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
      r.push(owner.getAttribute(THEME_DEF_ATTR_NAME));
    }
  }

  return r;
}

function UpdateTheme(t = undefined) {
  const allThemes = GetAvailableThemes();
  const theme = t ?? LocalStorage.get(STORAGE_THEME_ENTRY);
  html.setAttribute(
    HTML_THEME_ATTR_NAME,
    allThemes.includes(theme) ? theme : allThemes[0]
  );
}

function SetTheme(t) {
  const allThemes = GetAvailableThemes();
  if (allThemes.includes(t)) {
    LocalStorage.set(STORAGE_THEME_ENTRY, t);
  }
}

UpdateTheme();
observer.observe(html, { attributes: true });

addEventListener('storage', e => {
  if (e.key === STORAGE_THEME_ENTRY)
    UpdateTheme();
});
