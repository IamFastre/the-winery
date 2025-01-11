/**
 * Retrieves a list of available themes from the document's stylesheets.
 *
 * @returns {HTMLElement[]} - An array of elements that define available themes.
 */
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

/**
 * Sets the theme of the document.
 *
 * @param {string} [t] - The name of the theme to set. If not provided, the theme is retrieved from localStorage.
 */
function UpdateTheme(t = undefined) {
  const all_themes = GetAvailableThemes();
  const theme = t ?? localStorage.getItem("settings:theme");
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
