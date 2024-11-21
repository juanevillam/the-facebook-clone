import { ProfileDropDown } from '@/components/layout/navbar/drop-downs';
import { useTranslations } from 'next-intl';

export const MenuView = () => {
  const t = useTranslations('menu');

  return (
    <div className="-mt-10">
      <h1 className="primary-text mb-2 pl-2.5 text-2xl font-semibold">
        {t('title')}
      </h1>
      <ProfileDropDown variant="page" />
    </div>
  );
};
