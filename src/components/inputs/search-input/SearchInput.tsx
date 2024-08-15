import { useId } from 'react';

import { useTranslations } from 'next-intl';

import { InputEvent } from '@/assets/types';
import { CloseIcon, SearchIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';

export type SearchInputLabel = 'search' | 'where-are-you';

type SearchInputProps = {
  label: SearchInputLabel;
  handleClear: VoidFunction;
  onChange: (event: InputEvent) => void;
  value: string;
};

export const SearchInput = ({
  label,
  handleClear,
  onChange,
  value,
}: SearchInputProps) => {
  const t = useTranslations('search-input');
  const id = useId();

  return (
    <div className="flex-center primary-bg primary-transition relative w-full rounded-full p-2.5 pr-12 md:py-2">
      <SearchIcon className="secondary-fill size-4" />
      <label className="sr-only" htmlFor={id}>
        {t(label)}
      </label>
      <input
        aria-label={t(label)}
        className="primary-placeholder primary-text primary-transition ml-2 inline-flex w-full bg-transparent focus:outline-none"
        id={id}
        onChange={onChange}
        placeholder={t(label)}
        type="text"
        value={value}
      />
      {value && (
        <IconButton
          className="hover:secondary-bg absolute right-0 top-0.5 z-10 size-10 md:top-0"
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
