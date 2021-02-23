import { Injectable } from '@angular/core';

export enum Themes {
  default = 'default',
  dark = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme =
    localStorage.getItem('theme') === Themes.dark || localStorage.getItem('theme') === Themes.dark
      ? localStorage.getItem('theme')
      : 'default';
  previousTheme;

  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      document.head.append(style);
    });
  }

  private removeUnusedTheme(theme: Themes): void {
    document.documentElement.classList.remove(theme);
    const removedThemeStyle = document.getElementById(theme);
    if (removedThemeStyle) {
      document.head.removeChild(removedThemeStyle);
    }
  }

  loadTheme(themeName?: Themes, firstLoad = true) {
    if (themeName) {
      this.currentTheme = themeName;
      localStorage.setItem('theme', themeName);
    }
    const theme = this.currentTheme;
    this.loadCss(`${theme}.css`, theme).then(() => {
      if (!firstLoad) {
        document.documentElement.classList.add(theme);
      }
      this.removeUnusedTheme(this.previousTheme);
    });
  }
}
