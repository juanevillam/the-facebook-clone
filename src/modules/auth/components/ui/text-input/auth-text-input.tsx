'use client';

import { Field, useField } from 'formik';
import { useTranslations } from 'next-intl';

interface AuthTextInputProps {
  disabled: boolean;
  minLength?: number;
  name: string;
  placeholder: string;
  type: 'text' | 'email' | 'password';
  variant: 'standard' | 'outlined';
  varianttype?: 'standard' | 'secondary';
  [x: string]: any;
}

export const AuthTextInput = ({ ...props }: AuthTextInputProps) => {
  const { minLength, placeholder, variant, varianttype = 'standard' } = props;

  const [field, meta] = useField(props);
  const t = useTranslations();

  return (
    <div className="mb-4 w-full">
      {variant === 'outlined' && (
        <Field
          autoComplete="on"
          aria-describedby="error-message"
          aria-invalid={meta.error && meta.touched ? 'true' : 'false'}
          aria-label={placeholder}
          className={`border border-smoke-300 duration-150 focus:border-transparent focus:outline-none focus:ring-primary-100 focus:ring-2 placeholder-gray-500 px-4 py-3.5 rounded-md transition w-full ${
            varianttype === 'standard'
              ? 'bg-white hover:bg-gray-100'
              : 'bg-gray-100 hover:bg-gray-200'
          } ${
            meta.touched &&
            meta.error &&
            'focus:ring-error-100 ring-error-100 ring-2 md:mb-1'
          }`}
          {...field}
          {...props}
        />
      )}
      <div
        className={`${variant === 'standard' && 'mb-[22px]'}`}
        aria-live="assertive"
      >
        {meta.touched && meta.error && (
          <div className="flex items-center px-1.5 py-1.5 space-x-1.5 md:py-0.5 md:space-x-1">
            <label
              className="font-medium text-error-100 text-sm"
              id="error-message"
            >
              {t(meta.error[0], { min: minLength })}
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
