import { json } from '@remix-run/node';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'remix-i18next';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import type { MetaFunction, LoaderFunction } from '@remix-run/node';

import i18next from './config/locales/i18next.server';
import { dark, light } from './styles/themes';
import { Themes } from './models/settings';

import mainStyles from 'build/styles/main.global.css';

export type LoaderData = { locale: string };

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'schmaenjael.dev',
  viewport: 'width=device-width,initial-scale=1',
});

export const loader: LoaderFunction = async ({ request }) =>
  json<LoaderData>({ locale: await i18next.getLocale(request) });

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: mainStyles,
    },
  ];
};

const Root = () => {
  const { locale } = useLoaderData<LoaderData>();
  const { i18n } = useTranslation();

  const [theme, setTheme] = useState<Themes>(Themes.Light);

  const startupThemes = {
    dark: Object.entries(dark).map(([key, entry]) => [`--${key}`, entry]),
    light: Object.entries(light).map(([key, entry]) => [`--${key}`, entry]),
  };

  const updateTheme = () => {
    startupThemes[theme]?.forEach(([variable, value]) =>
      document.body.style.setProperty(variable, value)
    );
  };

  useEffect(() => {
    updateTheme();
  }, [theme]);

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet
          context={{
            theme,
            setTheme,
          }}
        />
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
};

export default Root;
