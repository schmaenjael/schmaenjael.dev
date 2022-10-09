import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <h1>{t('welcome')}</h1>
    </div>
  );
};

export default Index;
