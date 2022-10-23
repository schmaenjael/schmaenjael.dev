import { LoaderFunction, redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useChangeLanguage } from 'remix-i18next';
import { Locales } from 'src/models/settings';
import { supportedLngs } from '~/config/locales/i18n';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const locale = url.pathname.split('/')[1] as Locales;

  if (supportedLngs.includes(locale)) return { locale };
  else return redirect(`/_/404`);
};

const Lang = () => {
  const { locale } = useLoaderData();

  useChangeLanguage(locale);

  return <Outlet />;
};

export default Lang;
