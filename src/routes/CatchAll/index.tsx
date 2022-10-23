import { LinksFunction } from '@remix-run/node';
import SocialMedia, { socialMediaLinks } from 'src/components/SocialMedia';

import catchAllStyles from './catchAll.styles.css';

import BackgroundImage from 'public/assets/svgs/background.svg';

export const links: LinksFunction = () => {
  return [
    ...socialMediaLinks(),
    {
      rel: 'stylesheet',
      href: catchAllStyles,
    },
  ];
};

const CatchAll = () => {
  return (
    <div
      className="catch-all"
      style={{
        background: `url('${BackgroundImage}'), var(--background)`,
        backgroundRepeat: 'space repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="catch-all__social-media">
        <SocialMedia />
      </div>
    </div>
  );
};

export default CatchAll;
