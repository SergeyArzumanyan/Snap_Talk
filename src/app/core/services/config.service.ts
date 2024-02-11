import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";

import { SettingsService } from "@pages/layout/containers/menu/pages/settings/services";
import {
  AuthService,
  pusherEvents,
  PusherService,
} from "@app/core";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private systemDefaultTheme: string = this.themeInitialValue;
  public Theme: string = this.systemDefaultTheme;
  public Theme$: BehaviorSubject<string> = new BehaviorSubject<string>(this.Theme);

  public ThemeColor: string = '#6153CC';
  public prefixedThemeColors: { Color: string }[] = [
    { Color: '#6153CC' },
    { Color: '#4DAC6D' },
    { Color: '#d03249' },
    { Color: '#3e8fd7' },
    { Color: '#797C8C' },
  ];

  get themeInitialValue(): string {
    const isSystemDark: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isSystemDark ? 'dark' : 'light'
  }

  constructor(
    private authService: AuthService,
    private pusherService: PusherService,
    private settingsService: SettingsService
  ) {
    /** @desc Listens to system default theme changes. */
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener(
        'change',
        (e: MediaQueryListEvent) => {
          this.systemDefaultTheme = e.matches ? "dark" : "light";
        }
      );

    this.changeTheme(false, this.Theme);
    this.makeColorsBasedOnMainColor(this.ThemeColor);
  }

  private toggleTheme(): void {
    this.Theme = this.Theme === 'light' ? 'dark' : 'light';
    this.Theme$.next(this.Theme);
  }

  public changeTheme(saveTheme: boolean = false, theme?: string, ): void {
    if (!theme) {
      this.toggleTheme();
    }

    saveTheme ?
      this.saveAppearanceSettings() :
      this.changeCSSFilePath('theme', this.Theme + '-theme.css');

    this.setHTMLTheme();
  }

  public changeThemeColor(color: string, saveColor: boolean = false): void {
    document.documentElement.style.setProperty('--theme-color', color);
    this.ThemeColor = color;
    this.makeColorsBasedOnMainColor(this.ThemeColor, saveColor);
  }

  public makeColorsBasedOnMainColor(baseColor: string, saveColor: boolean = false, percentage: number = 40): void {
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
      if (this.Theme === 'dark') {
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

    document.documentElement.style.setProperty('--theme-color', this.ThemeColor);
    document.documentElement.style.setProperty('--theme-color-tint', tintColor);
    document.documentElement.style.setProperty('--theme-color-bg', bgColor);

    if (saveColor) {
      this.saveAppearanceSettings();
    }
  }

  public applyUserThemeSettings(Theme: string, ThemeColor: string): void {
    this.Theme = Theme ? Theme : this.themeInitialValue;
    this.Theme$.next(this.Theme);
    this.changeTheme(false, this.Theme);

    this.ThemeColor = ThemeColor;
    this.changeThemeColor(ThemeColor);
  }

  private saveAppearanceSettings(): void {
    const payload: any = {
      Theme: this.Theme,
      ThemeColor: this.ThemeColor
    };

    this.settingsService.saveAppearanceSettings(this.authService.userData$.getValue().Id, payload)
      .pipe(take(1))
      .subscribe({
        next: () => {
          console.log('Appearance Settings Saved Successfully.');
        },
        error: (err) => {
          console.group('HTTP Error')
          console.log('Something Went Wrong In \'saveAppearanceSettings\'');
          console.log(err);
          console.groupEnd();
        }
      });
  }

  private setHTMLTheme(): void {
    document.documentElement.style.colorScheme = this.Theme;
  }

  /** @desc Changes filePaths in index.html for layout-{theme}.css and theme-{theme}.css files. */
  private changeCSSFilePath(id: string, cssFileName: string): void {
    const element: HTMLElement | null = document.getElementById(id);

    const cssFilePath: string[] = element.getAttribute('href').split('/');
    cssFilePath[cssFilePath.length - 1] = cssFileName;

    const newURL = cssFilePath.join('/');

    this.replaceLink(element, newURL);
  }

  /** @desc Replaces filePaths in index.html for layout-{theme}.css and theme-{theme}.css files. */
  private replaceLink(linkElement: any, href: string): void {
    linkElement.href = href;
    this.makeColorsBasedOnMainColor(this.ThemeColor);
  }

  public subscribeToUserDataChanges(user: any): void {
    this.pusherService.subscribeToChannel(`user-${user.Id}`);

    this.pusherService.listenToChannelEvents(
      `user-${user.Id}`,
      pusherEvents.onDataChanges,
      (userData): void => {
        this.authService.userData$.next(userData);
        this.authService.isAuthenticated$.next(true);

        const { Theme, ThemeColor } = userData.AppearanceSettings;
        this.applyUserThemeSettings(Theme, ThemeColor);
      }
    );
  }
}
