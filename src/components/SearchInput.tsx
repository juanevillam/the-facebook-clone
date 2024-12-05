import { useId } from 'react';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { CloseIcon, SearchIcon } from '@/assets/icons';
import { InputEvent } from '@/assets/types';
import { IconButton } from '@/components/buttons';

export type SearchInputLabel = 'search' | 'search-messenger' | 'where-are-you';

type SearchInputProps = {
  label: SearchInputLabel;
  handleClear: VoidFunction;
  onChange: (event: InputEvent) => void;
  value: string;
  variant?: 'primary' | 'secondary';
};

export const SearchInput = ({
  label,
  handleClear,
  onChange,
  value,
  variant = 'primary',
}: SearchInputProps) => {
  const t = useTranslations('search-input');
  const id = useId();

  return (
    <div
      className={classNames(
        'flex-align-center bg-primary transition-primary relative w-full rounded-full p-2.5 pr-12',
        {
          'md:py-2': variant === 'primary',
          'md:py-1.5': variant === 'secondary',
        }
      )}
    >
      <SearchIcon aria-hidden="true" className="fill-secondary size-4" />
      <input
        aria-labelledby={id}
        className="placeholder-primary text-primary transition-primary ml-2 inline-flex w-full bg-transparent focus:outline-none"
        id={id}
        onChange={onChange}
        placeholder={t(label)}
        type="text"
        value={value}
      />
      <label id={id} className="sr-only">
        {t(label)}
      </label>
      {value && (
        <IconButton
          className={classNames(
            'hover:bg-secondary absolute right-0 top-0.5 z-10 md:top-0',
            {
              'size-10': variant === 'primary',
              'size-9': variant === 'secondary',
            }
          )}
          icon={{
            ariaLabel: 'clear-search',
            className: 'stroke-2 secondary-stroke size-full',
            Component: CloseIcon,
          }}
          onClick={handleClear}
        />
      )}
    </div>
  );
};
