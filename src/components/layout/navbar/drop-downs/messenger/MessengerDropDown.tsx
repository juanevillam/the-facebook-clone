import { useState } from 'react';

import { InputEvent } from '@/assets/types';
import {
  ArrowsPointingOutIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PencilSquareIcon,
} from '@/assets/ui/icons';
import { SearchInput } from '@/components/inputs';
import { Link } from '@/navigation';
import { DropDownHeaderIcon } from '../icons';
import { useTranslations } from 'next-intl';

export const MessengerDropDown = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const t = useTranslations('navbar.drop-downs.messenger');

  const handleClearSearch = () => setSearchInputValue('');
  2;

  const handleSearchChange = (event: InputEvent) =>
    setSearchInputValue(event.target.value);

  return (
    <div className="card primary-transition absolute right-5 top-14 size-96 px-4 py-3 shadow-lg">
      <div className="flex-center-justify-between mb-2 w-full">
        <h1 className="primary-text text-2xl font-bold">{t('title')}</h1>
        <div className="flex space-x-2">
          <DropDownHeaderIcon
            leftPosition="-left-9"
            icon={{
              className: 'secondary-stroke secondary-fill size-full',
              Component: ArrowsPointingOutIcon,
              name: 'see-all-in-messenger',
            }}
            onClick={() => {}}
          />
          <DropDownHeaderIcon
            leftPosition="-left-4"
            icon={{
              className: 'secondary-fill size-full',
              Component: PencilSquareIcon,
              name: 'new-message',
            }}
            onClick={() => {}}
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
      <div className="flex-center-justify-center mb-3 h-60 flex-col space-y-4">
        <ChatBubbleOvalLeftEllipsisIcon className="secondary-stroke size-36" />
        <h1 className="secondary-text text-xl font-medium">{t('subtitle')}</h1>
      </div>
      <div className="primary-border w-full border-t pt-2 text-center">
        <Link
          className="font-medium text-blue-400 hover:underline"
          href="/messenger"
        >
          {t('footer')}
        </Link>
      </div>
    </div>
  );
};
