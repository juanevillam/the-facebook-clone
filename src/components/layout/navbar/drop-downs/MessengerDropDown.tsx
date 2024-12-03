import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import {
  ArrowsPointingOutIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PencilSquareIcon,
} from '@/assets/icons';
import { InputEvent, SetValue } from '@/assets/types';
import { SearchInput } from '@/components';
import { Link } from '@/navigation';

import { DropDownHeaderIcon } from './icons';

type MessengerDropDownProps = {
  setOpenMessengerDropDown: SetValue<boolean>;
};

export const MessengerDropDown = ({
  setOpenMessengerDropDown,
}: MessengerDropDownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchInputValue, setSearchInputValue] = useState('');
  const t = useTranslations('navbar.drop-downs.messenger');

  const handleClearSearch = () => setSearchInputValue('');

  const handleSearchChange = (event: InputEvent) =>
    setSearchInputValue(event.target.value);

  const handleClose = () => setOpenMessengerDropDown(false);

  useEffect(() => {
    dropdownRef.current?.focus();
  }, []);

  return (
    <div
      aria-describedby="messenger-dropdown-description"
      aria-labelledby="messenger-dropdown-title"
      className="card only-desktop-block absolute right-5 top-14 w-96 px-4 py-3 shadow-lg"
      ref={dropdownRef}
      role="dialog"
      tabIndex={-1}
    >
      <div className="flex-center-justify-between mb-2 w-full">
        <h1
          className="primary-text text-2xl font-bold"
          id="messenger-dropdown-title"
        >
          {t('title')}
        </h1>
        <div className="flex space-x-2">
          <DropDownHeaderIcon
            leftPosition="-left-9"
            icon={{
              ariaLabel: 'see-all-in-messenger',
              className: 'secondary-stroke secondary-fill size-full',
              Component: ArrowsPointingOutIcon,
            }}
          />
          <DropDownHeaderIcon
            leftPosition="-left-4"
            icon={{
              ariaLabel: 'compose-new-message',
              className: 'secondary-fill size-full',
              Component: PencilSquareIcon,
            }}
          />
        </div>
      </div>
      <SearchInput
        label="search-messenger"
        handleClear={handleClearSearch}
        onChange={handleSearchChange}
        value={searchInputValue}
        variant="secondary"
      />
      <div
        className="flex-center-justify-center mb-3 h-60 flex-col space-y-4"
        id="messenger-dropdown-description"
      >
        <ChatBubbleOvalLeftEllipsisIcon className="secondary-fill size-36" />
        <h2 className="secondary-text text-xl font-medium">{t('subtitle')}</h2>
      </div>
      <div className="primary-border w-full border-t pt-3 text-center">
        <Link
          className="font-medium text-blue-400 hover:underline"
          href="/messenger"
          onClick={handleClose}
        >
          {t('footer')}
        </Link>
      </div>
    </div>
  );
};
