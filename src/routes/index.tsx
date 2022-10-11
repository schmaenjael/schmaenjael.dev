import { LoaderFunction, redirect } from '@remix-run/node';
import i18next from 'src/services/locales/i18next.server';

export const loader: LoaderFunction = async ({ request }) =>
  redirect(`${await i18next.getLocale(request)}/`);
