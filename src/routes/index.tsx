import { LoaderFunction, redirect } from '@remix-run/node';
import { i18next } from 'src/services';

export const loader: LoaderFunction = async ({ request }) =>
  redirect(`${await i18next.getLocale(request)}/`);
