import { LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useChangeLanguage } from 'remix-i18next';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const locale = url.pathname.split('/')[1];

  return { locale };
};

const Lang = () => {
  const { locale } = useLoaderData();

  useChangeLanguage(locale);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Lang;
