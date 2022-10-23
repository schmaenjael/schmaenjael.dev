import { LinksFunction } from '@remix-run/react/dist/routeModules';

import FacebookSVG from 'public/assets/svgs/facebook.svg';
import GitHubSVG from 'public/assets/svgs/github.svg';
import InstagramSVG from 'public/assets/svgs/instagram.svg';
import TwitterSVG from 'public/assets/svgs/twitter.svg';
import YoutubeSVG from 'public/assets/svgs/youtube.svg';
import LinkedInSVG from 'public/assets/svgs/linkedin.svg';

import socialMediaStyles from './socialMedia.styles.css';

export const socialMediaLinks: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: socialMediaStyles,
    },
  ];
};

const socialMediaList = [
  {
    active: false,
    label: 'Connect with me here, via Facebook!',
    link: '#',
    icon: FacebookSVG,
  },
  {
    active: true,
    label: 'Connect with me here, via LinkedIn!',
    link: 'https://www.linkedin.com/in/manuel-michael-mayer/',
    icon: LinkedInSVG,
  },
  {
    active: true,
    label: 'Read the sourcecode of some of my projects here!',
    link: 'https://github.com/schmaenjael',
    icon: GitHubSVG,
  },
  {
    active: true,
    label: 'Get in touch with me via Instagram!',
    link: 'https://www.instagram.com/schmaenjael/',
    icon: InstagramSVG,
  },
  {
    active: true,
    label: 'You can find my Twitter here!',
    link: 'https://twitter.com/schmaenjael2',
    icon: TwitterSVG,
  },
  {
    active: true,
    label: 'Visit my Youtube Channel here!',
    link: 'https://www.youtube.com/channel/UCW7QQjpLFf-whOlZxf_8k0w',
    icon: YoutubeSVG,
  },
];

const SocialMedia = () => {
  return (
    <div className="social-media">
      {socialMediaList?.map(({ active, label, link, icon }, i) => {
        if (active)
          return (
            <a
              key={i}
              className="social-media__block"
              aria-label={label}
              href={link}
              target={'_blank'}
            >
              <img className="social-media__block-image" src={icon} />
            </a>
          );
      })}
    </div>
  );
};

export default SocialMedia;
