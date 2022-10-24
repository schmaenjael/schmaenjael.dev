import { LoaderFunction, redirect } from '@remix-run/node';
import { supportedLngs } from 'src/config/locales/i18n';
import { i18next } from 'src/services';
import { Locales } from 'src/models/settings';

export const loader: LoaderFunction = async ({ request }) => {
  const requestLocale = request.url.split('/')[3];
  const locale = supportedLngs.includes(requestLocale as Locales)
    ? requestLocale
    : await i18next.getLocale(request);

  return redirect(`/${locale}/error?code=404`);
};
