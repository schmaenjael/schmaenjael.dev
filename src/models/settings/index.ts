export interface Settings {
  [key: string]: unknown;
  theme: Themes;
  language: Locales;
}

export enum Themes {
  Dark = 'dark',
  Light = 'light',
}

export enum Locales {
  DE = 'de',
  EN = 'en',
}
