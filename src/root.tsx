import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  json,
  MetaFunction,
  LoaderFunction,
  LinksFunction,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import { Locales, Themes } from './models/settings';
import { SettingsContext } from 'src/context/settings/';
import { supportedLngs } from 'src/config/locales/i18n';
import { themes, i18next } from 'src/services';

import mainStyles from 'src/styles/main.global.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'schmaenjael.dev',
  viewport: 'width=device-width,initial-scale=1',
});

export const loader: LoaderFunction = async ({ request }) => {
  const lang = await i18next.getLocale(request);
  const locale = supportedLngs.includes(lang as Locales)
    ? (lang as Locales)
    : Locales.EN;

  return json({ locale });
};

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: mainStyles,
    },
  ];
};

const Root = () => {
  const [theme, setTheme] = useState<Themes>(Themes.Dark);
  const { locale } = useLoaderData<{ locale: Locales }>();
  const { i18n } = useTranslation();

  useEffect(() => themes.updateTheme(theme), [theme]);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <SettingsContext.Provider
          value={{
            locale,
            theme,
            setTheme,
          }}
        >
          <Outlet />
        </SettingsContext.Provider>
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
};

export default Root;
