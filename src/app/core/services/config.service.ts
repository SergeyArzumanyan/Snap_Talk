import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private systemDefaultColorScheme: string = this.colorSchemeInitialValue;
  private colorScheme: string = localStorage.getItem('selectedTheme') || this.systemDefaultColorScheme;
  public colorScheme$: BehaviorSubject<string> = new BehaviorSubject<string>(this.colorScheme);

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

    if (!localStorage.getItem('selectedTheme')) {
      localStorage.setItem('selectedTheme', this.colorScheme);
    }

    this.setColorSchemeOfHTML();
    this.changeColorScheme(false);
  }

  /** @desc Toggles theme and saves it in local storage. */
  private setColorSchemeStates(): void {
    this.colorScheme = this.colorScheme === 'light' ? 'dark' : 'light';
    this.colorScheme$.next(this.colorScheme);
    localStorage.setItem('selectedTheme', this.colorScheme);
  }

  public changeColorScheme(isClickedManually: boolean = true): void {
    if (isClickedManually) {
      this.setColorSchemeStates();
    }

    this.changeStyleSheetsColor('layout-css', 'layout-' + this.colorScheme + '.css');
    this.changeStyleSheetsColor('theme-css', 'theme-' + this.colorScheme + '.css');
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
    });
  }
}
