import { useId } from 'react';

import { useTranslations } from 'next-intl';

import { inputEventType } from '@/assets/types';
import { SearchIcon } from '@/assets/ui/icons';

interface SearchInputProps {
  label: 'search' | 'where-are-you';
  onChange: (event: inputEventType) => void;
  value: string;
}

export const SearchInput = ({ label, onChange, value }: SearchInputProps) => {
  const t = useTranslations('search-input');
  const id = useId();

  return (
    <div className="bg-gray-100 duration-150 flex items-center px-3 py-2.5 rounded-full transition w-full dark:bg-dark-200">
      <SearchIcon className="fill-gray-500 size-4 dark:fill-gray-400" />
      <label className="sr-only" htmlFor={id}>
        {t(label)}
      </label>
      <input
        aria-label={t(label)}
        className="bg-transparent duration-150 font-light inline-flex placeholder-gray-500 text-gray-500 ml-2 outline-none transition w-full dark:text-gray-400 dark:placeholder-dark-300"
        id={id}
        onChange={onChange}
        placeholder={t(label)}
        type="text"
        value={value}
      />
    </div>
  );
};
