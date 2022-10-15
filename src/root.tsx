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
import { getUUID } from './services/uuid';

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
  const nonce = `nonce-${getUUID()}`;

  return json({ locale, nonce });
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
  const { locale, nonce } = useLoaderData<{ locale: Locales; nonce: string }>();
  const { i18n } = useTranslation();

  const csp = `script-src 'nonce-${nonce}' 'unsafe-inline' https: http: 'nonce-${nonce}' 'strict-dynamic'; base-uri 'self'; object-src 'none';`;

  useEffect(() => themes.updateTheme(theme), [theme]);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <meta httpEquiv="Content-Security-Policy" content={csp} />
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
        <ScrollRestoration nonce={nonce} />
        <LiveReload nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
};

export default Root;
