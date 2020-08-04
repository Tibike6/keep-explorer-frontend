function switchStyle(themeName) {
  if (themeName) {
    var themes = document.querySelectorAll('[data-theme="theme"]');
    for (var theme of themes) {
      theme.disabled = theme.title !== themeName;
    }
  }
}
