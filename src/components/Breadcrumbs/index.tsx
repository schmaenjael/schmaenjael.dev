import { LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import breadcrumbsStyles from './breadcrumbs.styles.css';

export const breadcrumbsLinks: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: breadcrumbsStyles,
    },
  ];
};

interface BreadCrumbsProps {
  url: string;
  className: string;
}

const Breadcrumbs = ({ url, className }: BreadCrumbsProps) => {
  const breadCrumbs = url.split(/\/|\?/g).splice(3);

  return (
    <div className={`breadcrumbs ${className}`}>
      <span className="breadcrumbs__opening">{'/> $'}</span>
      {breadCrumbs.map((route, i) => {
        return (
          <Link to={`/${breadCrumbs.slice(0, i + 1).join('/')}`} key={route}>
            <span className="breadcrumbs__route">
              {route.includes('=') ? `_${route}` : route}
            </span>
            <span className="breadcrumbs__seperator">/</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
