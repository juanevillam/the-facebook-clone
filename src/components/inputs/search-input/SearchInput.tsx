import { useId } from 'react';

import { useTranslations } from 'next-intl';

import { InputEvent } from '@/assets/types';
import { CloseIcon, SearchIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';

export type SearchInputLabel = 'search' | 'where-are-you';

interface SearchInputProps {
  label: SearchInputLabel;
  handleClear: VoidFunction;
  onChange: (event: InputEvent) => void;
  value: string;
}

export const SearchInput = ({
  label,
  handleClear,
  onChange,
  value,
}: SearchInputProps) => {
  const t = useTranslations('search-input');
  const id = useId();

  return (
    <div className="flex-center primary-bg primary-transition p-2.5 pr-12 md:py-2 relative rounded-full w-full">
      <SearchIcon className="secondary-fill size-4" />
      <label className="sr-only" htmlFor={id}>
        {t(label)}
      </label>

      <input
        aria-label={t(label)}
        className="primary-placeholder primary-text primary-transition bg-transparent inline-flex ml-2 w-full focus:outline-none"
        id={id}
        onChange={onChange}
        placeholder={t(label)}
        type="text"
        value={value}
      />
      {value && (
        <IconButton
          className="absolute right-0 size-10 top-0.5 md:top-0 z-10 hover:secondary-bg"
          icon={{
            className: 'stroke-2 secondary-stroke size-full',
            Component: CloseIcon,
            name: 'close',
          }}
          onClick={handleClear}
        />
      )}
    </div>
  );
};
