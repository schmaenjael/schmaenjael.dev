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

import { Locales, Themes } from 'src/models/settings';
import { SettingsContext } from 'src/context/settings/';
import { fallbackLng, supportedLngs } from 'src/config/locales/i18n';
import { themes, i18next, getUUID } from 'src/services';

import mainStyles from 'src/styles/main.global.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'schmaenjael.dev',
  viewport: 'width=device-width,initial-scale=1',
});

export const handle = {
  i18n: 'common',
};

export const loader: LoaderFunction = async ({ request }) => {
  const lang = (await i18next.getLocale(request)) as Locales;
  const requestLocale = request.url.split(/\/|\?/g).splice(3)[0] as Locales;
  const locale = supportedLngs.includes(requestLocale)
    ? requestLocale
    : lang || fallbackLng;
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

  useEffect(() => themes.updateTheme(theme), [theme]);

  return (
    <html lang={locale} dir={i18n.dir(locale)}>
      <head>
        <Meta />
        <meta
          httpEquiv="Content-Security-Policy"
          content={`script-src 'nonce-${nonce}' 'unsafe-inline' https: http: 'nonce-${nonce}' 'strict-dynamic'; base-uri 'self'; object-src 'none';`}
        />
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
