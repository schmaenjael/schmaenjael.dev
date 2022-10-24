import { LoaderFunction, redirect } from '@remix-run/node';
import { supportedLngs } from 'src/config/locales/i18n';
import { i18next } from 'src/services';
import { Locales } from 'src/models/settings';
import { HttpStatusCode } from '~/models/http/statusCodes';

export const loader: LoaderFunction = async ({ request }) => {
  const requestLocale = request.url.split('/')[3] as Locales;
  const statusCode = HttpStatusCode.NotFound;
  const locale = supportedLngs.includes(requestLocale)
    ? requestLocale
    : await i18next.getLocale(request);

  return redirect(`/${locale}/error?code=${statusCode}`);
};
