import { LinksFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import SocialMedia, { socialMediaLinks } from 'src/components/SocialMedia';
import { HttpStatusCode } from 'src/models/http/statusCodes';

import errorStyles from './error.styles.css';

export const links: LinksFunction = () => {
  return [
    ...socialMediaLinks(),
    {
      rel: 'stylesheet',
      href: errorStyles,
    },
  ];
};

export const loader: LoaderFunction = ({ request }) => {
  const queryParameters = new URLSearchParams(request.url.split('?')[1]);
  const statusCode = Number(queryParameters.get('code'));

  return { statusCode };
};

const CatchAll = () => {
  const { statusCode } = useLoaderData<{ statusCode: number }>();

  return (
    <div className="catch-all">
      <main className="catch-all__main">
        <h2>Oh no!</h2>
        <h3>Looks like this page does not *yet* exist!</h3>
        <h1>{statusCode}</h1>
      </main>
      <SocialMedia />
    </div>
  );
};

export default CatchAll;
