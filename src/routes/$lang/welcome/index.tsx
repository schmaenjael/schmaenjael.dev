import { LinksFunction, LoaderFunction, redirect } from '@remix-run/node';
import SocialMedia, { socialMediaLinks } from 'src/components/SocialMedia';
import { fallbackLng, supportedLngs } from 'src/config/locales/i18n';
import { Locales } from 'src/models/settings';

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
  const url = new URL(request.url);
  const locale = url.pathname.split('/')[1] as Locales;

  if (supportedLngs.includes(locale)) return { locale };
  else return redirect(`/${fallbackLng}/error?code=404`);
};

/*
 ? This route resolves to http://localhost:3000/$lang
 ? instead of http://localhost:3000/$lang/welcome
 */
const Welcome = () => {
  return (
    <div className="catch-all">
      <main className="catch-all__main">
        <h1>meow</h1>
      </main>
      <div className="catch-all__social-media">
        <SocialMedia />
      </div>
    </div>
  );
};

export default Welcome;