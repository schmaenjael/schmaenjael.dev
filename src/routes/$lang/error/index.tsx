import { LinksFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SocialMedia, { socialMediaLinks } from 'src/components/SocialMedia';
import Breadcrumbs, { breadcrumbsLinks } from '~/components/Breadcrumbs';

import errorStyles from './error.styles.css';

export const links: LinksFunction = () => {
  return [
    ...socialMediaLinks(),
    ...breadcrumbsLinks(),
    {
      rel: 'stylesheet',
      href: errorStyles,
    },
  ];
};

export const handle = {
  i18n: 'common',
};

export const loader: LoaderFunction = ({
  request,
}): {
  statusCode: number;
  url: string;
} => {
  const queryParameters = new URLSearchParams(request.url.split('?')[1]);
  const statusCode = Number(queryParameters.get('code'));

  return { statusCode, url: request.url };
};

const CatchAll = () => {
  const { t } = useTranslation('common');
  const { statusCode, url } = useLoaderData<{
    statusCode: number;
    url: string;
  }>();

  return (
    <div className="catch-all">
      <main className="catch-all__main">
        <Breadcrumbs className="catch-all__main-bread-crumbs" url={url} />
        <section className="catch-all__jumbotron">
          <h2>{t('error__attention_grabber')}</h2>
          <h3>{t(`error__status_${statusCode || 404}`)}</h3>
          <h1>{statusCode}</h1>
        </section>
        <SocialMedia className="catch-all__main-social-media" />
      </main>
      <footer className={`catch-all__footer`}>
        <section className="catch-all__footer-legal">
          {t('general__legal')}
        </section>
        <section className="catch-all__footer-legal-links">
          Datenschutzrichtlinie Verwendung von Cookies Nutzungsbedingungen
          Verkauf und Rückerstattung Rechtliche Hinweise Sitemap
        </section>
      </footer>
    </div>
  );
};

export default CatchAll;
