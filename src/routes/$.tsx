import { LoaderFunction, redirect } from '@remix-run/node';
import { fallbackLng } from 'src/config/locales/i18n';

export const loader: LoaderFunction = async ({ request }) =>
  redirect(`/${fallbackLng}/error?code=404`);
