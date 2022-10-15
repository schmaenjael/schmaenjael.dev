import { LinksFunction } from '@remix-run/node';
import SocialMedia, { socialMediaLinks } from 'src/components/SocialMedia';

export const links: LinksFunction = () => {
  return [...socialMediaLinks()];
};

const CatchAll = () => {
  return (
    <div className="catch-all">
      <SocialMedia />
    </div>
  );
};

export default CatchAll;
