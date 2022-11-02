import { LinksFunction, LoaderFunction, redirect } from '@remix-run/node';
import { useTranslation } from 'react-i18next';
import SocialMedia, { socialMediaLinks } from 'src/components/SocialMedia';
import { fallbackLng, supportedLngs } from 'src/config/locales/i18n';
import { Locales } from 'src/models/settings';
import { HttpStatusCode } from '~/models/http/statusCodes';

import welcomeStyles from './welcome.styles.css';

export const links: LinksFunction = () => {
  return [
    ...socialMediaLinks(),
    {
      rel: 'stylesheet',
      href: welcomeStyles,
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = request.url.split('/')[3] as Locales;
  const statusCode = HttpStatusCode.NotFound;

  if (supportedLngs.includes(locale)) return { locale };
  else return redirect(`/${fallbackLng}/error?code=${statusCode}`);
};

/*
 ? This route resolves to http://localhost:3000/$lang
 ? instead of http://localhost:3000/$lang/welcome
 */
const Welcome = () => {
  const { t } = useTranslation('common');

  return (
    <div className="catch-all">
      <main className="catch-all__main">
        <h1>{t('meow')}</h1>
      </main>
      <div className="catch-all__social-media">
        <SocialMedia />
      </div>
    </div>
  );
};

export default Welcome;
