import { Themes } from 'src/models/settings';
import { dark, light } from 'src/styles/themes';

const startupThemes = {
  dark: Object.entries(dark).map(([key, entry]) => [`--${key}`, entry]),
  light: Object.entries(light).map(([key, entry]) => [`--${key}`, entry]),
};

export const updateTheme = (theme: Themes) => {
  startupThemes[theme]?.forEach(([variable, value]) =>
    document.body.style.setProperty(variable, value)
  );
};
