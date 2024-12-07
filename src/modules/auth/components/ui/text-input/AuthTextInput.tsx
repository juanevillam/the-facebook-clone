'use client';

import { useTransition } from 'react';

import classNames from 'classnames';
import { Field, useField, useFormikContext } from 'formik';
import { useTranslations } from 'next-intl';

import { CloseIcon } from '@/assets/icons';
import { IconButton } from '@/components/buttons';
import { AlertTriangleImage } from '@/components/images';

import { AuthTextInputProps } from './types';

export const AuthTextInput = ({
  ariaDescribedBy,
  datatestid,
  disabled = false,
  id,
  minLength,
  name,
  placeholder,
  skin = 'primary',
  type,
  variant = 'desktop',
}: AuthTextInputProps) => {
  const [field, { error, touched }] = useField(name);
  const { setFieldValue } = useFormikContext();
  const t = useTranslations();

  const handleClear = () => setFieldValue(name, '');

  return (
    <div className="mb-4 w-full">
      {variant === 'desktop' ? (
        <Field
          autoComplete={type === 'password' ? 'current-password' : 'on'}
          aria-describedby={
            error && touched ? `${id}-error` : ariaDescribedBy || undefined
          }
          aria-invalid={error && touched ? 'true' : 'false'}
          aria-labelledby={`${id}-label`}
          className={classNames(
            'border-primary placeholder-primary w-full rounded-md border px-4 py-3.5 transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-100',
            {
              'bg-card hover:bg-primary': skin === 'primary',
              'bg-primary hover:bg-secondary': skin !== 'primary',
              'ring-2 ring-error-100 focus:ring-error-100 md:mb-1':
                error && touched,
            }
          )}
          data-testid={datatestid}
          disabled={disabled}
          id={id}
          minLength={minLength}
          placeholder={placeholder}
          type={type}
          {...field}
        />
      ) : (
        <div
          className={classNames('relative h-12 w-full', {
            'mb-[22px]': !error,
          })}
        >
          <input
            autoComplete={type === 'password' ? 'new-password' : 'on'}
            aria-describedby={error && touched ? `${id}-error` : undefined}
            aria-invalid={error && touched ? 'true' : 'false'}
            aria-labelledby={`${id}-label`}
            aria-label={placeholder}
            className={classNames(
              'focus:text-primary peer absolute left-0 top-0 z-10 h-[52px] w-full border-b-2 border-gray-300 bg-transparent pl-3 pr-16 pt-2 outline-none transition-all duration-300 ease-in-out focus:border-b-primary-100 dark:border-neutral-700',
              {
                'border-b-error-100 focus:border-b-error-100': error && touched,
              }
            )}
            data-testid={datatestid}
            disabled={disabled}
            id={id}
            minLength={minLength}
            placeholder=" "
            type={type}
            {...field}
          />
          <label
            className={classNames(
              'text-secondary pointer-events-none absolute z-10 px-2 transition-all duration-300 ease-in-out peer-focus:-top-[0.1rem] peer-focus:z-10 peer-focus:text-xs peer-focus:font-medium peer-focus:text-primary-100',
              {
                'peer-focus:text-error-100': error && touched,
                '-top-[0.1rem] text-xs font-medium': field.value,
                'top-4 text-base': !field.value,
              }
            )}
            htmlFor={id}
            id={`${id}-label`}
          >
            {placeholder}
          </label>
          {field.value && (
            <IconButton
              className="hover:bg-primary/10 absolute right-2 top-2 z-10 size-10 transition-all duration-200 hover:rounded-full"
              icon={{
                ariaLabel: 'clear-value',
                className: 'size-full stroke-[1.5] text-primary',
                Component: CloseIcon,
              }}
              onClick={handleClear}
            />
          )}
        </div>
      )}
      {error && touched && (
        <div
          aria-live="assertive"
          className="flex items-center space-x-1.5 px-1.5 py-1.5 opacity-100 transition-opacity duration-300 ease-in-out md:space-x-1 md:py-0.5"
          id={`${id}-error`}
          role="alert"
        >
          <AlertTriangleImage size={16} />
          <label className="text-sm font-medium text-error-100">
            {t(error[0], { min: minLength })}
          </label>
        </div>
      )}
    </div>
  );
};
