import { useId } from 'react';

import { useTranslations } from 'next-intl';

import { InputEvent } from '@/assets/types';
import { CloseIcon, SearchIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';

interface SearchInputProps {
  label: 'search' | 'where-are-you';
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
    <div className="bg-gray-100 duration-150 flex items-center pl-3 pr-12 py-2.5 relative rounded-full transition w-full dark:bg-dark-200">
      <SearchIcon className="fill-gray-500 size-4 dark:fill-gray-300 md:dark:fill-gray-400" />
      <label className="sr-only" htmlFor={id}>
        {t(label)}
      </label>
      <input
        aria-label={t(label)}
        className="bg-transparent duration-150 font-light inline-flex placeholder-gray-500 text-gray-700 ml-2 outline-none transition w-full dark:text-gray-300 dark:placeholder-gray-300 md:font-normal md:dark:placeholder-gray-400"
        id={id}
        onChange={onChange}
        placeholder={t(label)}
        type="text"
        value={value}
      />
      {value && (
        <IconButton
          className="absolute right-0 size-10 top-0.5 z-10 dark:hover:bg-dark-500"
          icon={{
            className:
              'stroke-gray-500 size-full stroke-2 dark:stroke-gray-300 md:dark:stroke-gray-400',
            Component: CloseIcon,
            name: 'close',
          }}
          onClick={handleClear}
        />
      )}
    </div>
  );
};
