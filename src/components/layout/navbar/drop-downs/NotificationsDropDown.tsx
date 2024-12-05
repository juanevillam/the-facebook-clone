import { useEffect, useRef } from 'react';

import { useTranslations } from 'next-intl';

import { BellIcon, DotsHorizontalIcon } from '@/assets/icons';

import { DropDownHeaderIcon } from './icons';

export const NotificationsDropDown = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('navbar.drop-downs.notifications');

  useEffect(() => {
    dropdownRef.current?.focus();
  }, []);

  return (
    <div
      aria-describedby="notifications-dropdown-description"
      aria-labelledby="notifications-dropdown-title"
      className="card responsive-desktop-block absolute right-5 top-14 w-96 px-4 py-3 shadow-lg"
      ref={dropdownRef}
      role="dialog"
      tabIndex={-1}
    >
      <div className="flex-between mb-2 w-full">
        <h1
          className="text-primary text-2xl font-bold"
          id="notifications-dropdown-title"
        >
          {t('title')}
        </h1>
        <DropDownHeaderIcon
          leftPosition="-left-4"
          icon={{
            ariaLabel: 'open-notification-options-menu',
            className: 'secondary-stroke fill-secondary size-full',
            Component: DotsHorizontalIcon,
          }}
        />
      </div>
      <div
        className="flex-center mb-3 h-60 flex-col space-y-4"
        id="notifications-dropdown-description"
      >
        <BellIcon className="fill-secondary size-36" />
        <h2 className="text-secondary text-xl font-medium">
          {t('you-have-no-notifications')}
        </h2>
      </div>
    </div>
  );
};
