import type { InitOptions } from 'i18next';

const i18nConfig: InitOptions = {
  supportedLngs: ['en', 'de'],
  fallbackLng: 'en',
  defaultNS: 'common',
  react: { useSuspense: false },
};

export default i18nConfig;
