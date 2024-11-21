import { useTranslations } from 'next-intl';

import { BellIcon, DotsHorizontalIcon } from '@/assets/ui/icons';

import { DropDownHeaderIcon } from '../icons';

export const NotificationsDropDown = () => {
  const t = useTranslations('navbar.drop-downs.notifications');

  return (
    <div className="card only-desktop-block absolute right-5 top-14 w-96 px-4 py-3 shadow-lg">
      <div className="flex-center-justify-between mb-2 w-full">
        <h1 className="primary-text text-2xl font-bold">{t('title')}</h1>
        <DropDownHeaderIcon
          leftPosition="-left-4"
          icon={{
            className: 'secondary-stroke secondary-fill size-full',
            Component: DotsHorizontalIcon,
            name: 'more-options',
          }}
          onClick={() => {}}
        />
      </div>
      <div className="flex-center-justify-center mb-3 h-60 flex-col space-y-4">
        <BellIcon className="secondary-fill size-36" />
        <h1 className="secondary-text text-xl font-medium">
          {t('you-have-no-notifications')}
        </h1>
      </div>
    </div>
  );
};
