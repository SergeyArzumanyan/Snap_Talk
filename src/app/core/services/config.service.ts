import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private systemDefaultColorScheme: string = this.colorSchemeInitialValue;
  private colorScheme: string = localStorage.getItem('SelectedTheme') || this.systemDefaultColorScheme;
  public colorScheme$: BehaviorSubject<string> = new BehaviorSubject<string>(this.colorScheme);

  public themeColor: string;
  public prefixedThemeColors: { Color: string }[] = [
    { Color: '#6153CC' },
    { Color: '#797C8C' },
    { Color: '#4DAC6D' },
    { Color: '#50A5F1' },
    { Color: '#E73E8C' }
  ];

  get colorSchemeInitialValue(): string {
    const isSystemDark: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isSystemDark ? 'dark' : 'light'
  }

  constructor() {
    /** @desc Listens to system default theme changes. */
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener(
        'change',
        (e: MediaQueryListEvent) => {
          this.systemDefaultColorScheme = e.matches ? "dark" : "light";
        }
      );

    if (!localStorage.getItem('SelectedTheme')) {
      localStorage.setItem('SelectedTheme', this.colorScheme);
    }

    this.changeColorScheme(false);
    this.initThemeColor();
  }
  /** @desc Toggles theme and saves it in local storage. */
  private setColorSchemeStates(): void {
    this.colorScheme = this.colorScheme === 'light' ? 'dark' : 'light';
    this.colorScheme$.next(this.colorScheme);
    localStorage.setItem('SelectedTheme', this.colorScheme);
  }

  public changeColorScheme(isClickedManually: boolean = true): void {
    if (isClickedManually) {
      this.setColorSchemeStates();
    }

    this.changeStyleSheetsColor('layout-css', 'layout-' + this.colorScheme + '.css');
    this.changeStyleSheetsColor('theme-css', 'theme-' + this.colorScheme + '.css');
    this.setColorSchemeOfHTML();
  }

  private setColorSchemeOfHTML(): void {
    document.documentElement.style.colorScheme = this.colorScheme;
  }

  /** @desc Changes filePaths in index.html for layout-{theme}.css and theme-{theme}.css files. */
  private changeStyleSheetsColor(id: string, cssFileName: string): void {
    const element: HTMLElement | null = document.getElementById(id);

    const cssFilePath: string[] = element!.getAttribute('href')!.split('/');
    cssFilePath[cssFilePath.length - 1] = cssFileName;

    const newURL = cssFilePath.join('/');

    this.replaceLink(element, newURL);
  }

  /** @desc Replaces filePaths in index.html for layout-{theme}.css and theme-{theme}.css files. */
  private replaceLink(linkElement: any, href: string): void {
    const id = linkElement?.getAttribute('id');
    const cloneLinkElement = linkElement.cloneNode(true);

    cloneLinkElement?.setAttribute('href', href);
    cloneLinkElement?.setAttribute('id', id + '-clone');

    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

    /** @desc Waits until changed css file is loaded. */
    cloneLinkElement.addEventListener('load', () => {
      linkElement.remove();
      cloneLinkElement.setAttribute('id', id);
      this.initThemeColor();
    });
  }

  private initThemeColor(): void {
    if (!localStorage.getItem('ThemeColor')) {
      localStorage.setItem('ThemeColor', this.prefixedThemeColors[0].Color);
    }

    document.documentElement.style
      .setProperty('--theme-color', localStorage.getItem('ThemeColor'));
    this.themeColor = localStorage.getItem('ThemeColor')!;
    this.makeColorsBasedOnMainColor(this.themeColor);
  }

  public changeThemeColor(color: string): void {
    localStorage.setItem('ThemeColor', color);
    document.documentElement.style.setProperty('--theme-color', color);
    this.themeColor = color;
    this.makeColorsBasedOnMainColor(this.themeColor);
  }

  public makeColorsBasedOnMainColor(baseColor: string, percentage: number = 40): void {
    /** @desc Converts HEX to RGB */
    const hexToRgb = (hex: string) => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    });

    /** @desc Converts RGB to HEX */
    const rgbToHex = (rgb: { r: number; g: number; b: number }): string =>
      `#${(1 << 24 | rgb.r << 16 | rgb.g << 8 | rgb.b).toString(16).slice(1)}`;

    /** @desc Darken the color by a certain percentage */
    const changedColorBasedOnTheme = (color: number): number => {
      if (this.colorScheme === 'dark') {
        return Math.round(color * (1 - percentage / 100));
      } else {
        return Math.round(color + (255 - color) * (percentage / 100));
      }
    };

    const baseRgb = hexToRgb(baseColor);

    const tintColorRGB = {
      r: changedColorBasedOnTheme(baseRgb.r),
      g: changedColorBasedOnTheme(baseRgb.g),
      b: changedColorBasedOnTheme(baseRgb.b),
    };
    const tintColor: string = rgbToHex(tintColorRGB);

    const bgColorRGB = {
      r: changedColorBasedOnTheme(tintColorRGB.r),
      g: changedColorBasedOnTheme(tintColorRGB.g),
      b: changedColorBasedOnTheme(tintColorRGB.b),
    };
    const bgColor: string = rgbToHex(bgColorRGB);

    document.documentElement.style.setProperty('--theme-color-tint',  tintColor);
    document.documentElement.style.setProperty('--theme-color-bg', bgColor);
  }

}
