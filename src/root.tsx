import { useTranslation } from 'react-i18next';
import { json } from '@remix-run/node';
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
import { useChangeLanguage } from 'remix-i18next';

export type LoaderData = { locale: string };

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'schmaenjael.dev',
  viewport: 'width=device-width,initial-scale=1',
});

export const loader: LoaderFunction = async ({ request }) =>
  json<LoaderData>({ locale: await i18next.getLocale(request) });

export const handle = {
  i18n: 'common',
};

const Root = () => {
  const { locale } = useLoaderData<LoaderData>();
  const { i18n } = useTranslation();

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
};

export default Root;
