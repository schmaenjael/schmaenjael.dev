import { useTranslation } from 'react-i18next';
import { useOutletContext } from '@remix-run/react';

const Index = () => {
  const { t } = useTranslation('common');
  const { theme, setTheme } = useOutletContext<Settings>();

  return (
    <main>
      <h1>{t('welcome')}</h1>
      <button
        onClick={() => {
          if (theme === 'dark') setTheme('light');
          else setTheme('dark');
        }}
      >
        {theme}
      </button>
    </main>
  );
};

export default Index;
