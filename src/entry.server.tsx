import Backend from 'i18next-fs-backend';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { renderToPipeableStream } from 'react-dom/server';
import { RemixServer } from '@remix-run/react';
import { createInstance } from 'i18next';
import { PassThrough } from 'stream';
import { resolve } from 'path';

import type { EntryContext } from '@remix-run/server-runtime';

import i18n from './config/locales/i18n';
import i18next from './config/locales/i18next.server';
import isbot from 'isbot';

const ABORT_DELAY = 5_000;

const handleRequest = async (
  request: Request,
  status: number,
  headers: Headers,
  context: EntryContext
) => {
  const lng = await i18next.getLocale(request);
  const ns = i18next.getRouteNamespaces(context);
  const instance = createInstance();

  await instance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns,
      backend: {
        loadPath: resolve(`./public/locales/{{lng}}/{{ns}}.json`),
        allowMultiLoading: true,
      },
    });

  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RemixServer context={context} url={request.url} />
      </I18nextProvider>,
      {
        [isbot(headers.get('User-Agent')) ? 'onAllReady' : 'onShellReady']:
          () => {
            const body: any = new PassThrough({ encoding: 'utf-8' });

            headers.set('Content-Type', 'text/html');

            resolve(
              new Response(body, {
                headers,
                status,
              })
            );

            pipe<any>(body);
          },
        onShellError: (error: unknown) => reject(error),
        onError: (error: unknown) => console.error(error),
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
};

export default handleRequest;
