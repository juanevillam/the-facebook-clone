import { useTranslations } from 'next-intl';

import { ProfileDropDown } from './layout/navbar/drop-downs';

export const MenuView = () => {
  const t = useTranslations('menu');

  return (
    <div className="-mt-10">
      <h1 className="text-primary mb-2 pl-2.5 text-3xl font-bold transition-colors duration-300">
        {t('title')}
      </h1>
      <ProfileDropDown variant="page" />
    </div>
  );
};
