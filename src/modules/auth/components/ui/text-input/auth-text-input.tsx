'use client';

import { Field, useField, useFormikContext } from 'formik';
import { useTranslations } from 'next-intl';

import { CloseIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { AlertTriangleImage } from '@/components/images';

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

export const AuthTextInput = (props: AuthTextInputProps) => {
  const {
    minLength,
    placeholder,
    name,
    variant,
    varianttype = 'standard',
  } = props;

  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const t = useTranslations();

  const handleClear = () => {
    setFieldValue(name, '');
  };

  return (
    <div className="mb-4 w-full">
      {variant === 'outlined' ? (
        <Field
          autoComplete="on"
          aria-describedby={`${props.name}-error`}
          aria-invalid={meta.error && meta.touched ? 'true' : 'false'}
          aria-label={placeholder}
          className={`border border-gray-200 duration-150 focus:border-transparent focus:outline-none focus:ring-primary-100 focus:ring-2 placeholder-gray-500 px-4 py-3.5 rounded-md transition w-full ${
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
      ) : (
        <div className={`h-12 relative w-full ${!meta.error && 'mb-[22px]'}`}>
          <input
            autoComplete="on"
            aria-label={placeholder}
            aria-invalid={meta.error && meta.touched ? 'true' : 'false'}
            className={`absolute bg-transparent border-b-2 focus:text-dark-400 h-[52px] left-0 outline-none peer pl-3 pr-16 pt-2 top-0 w-full z-10 ${
              meta.touched && meta.error
                ? 'border-b-error-100 focus:border-b-error-100'
                : 'border-b-gray-200 focus:border-b-primary-100'
            }`}
            {...field}
            {...props}
            placeholder=" "
          />
          <label
            className={`absolute duration-150 peer-focus:font-medium peer-focus:text-xs peer-focus:-top-[0.1rem] peer-focus:z-10 pointer-events-none px-2 text-gray-500 transition-all z-10 ${
              meta.touched && meta.error
                ? 'peer-focus:text-error-100'
                : 'peer-focus:text-primary-100'
            } ${field.value ? 'font-medium text-xs -top-[0.1rem]' : 'top-4'}`}
          >
            {placeholder}
          </label>
          {field.value && (
            <IconButton
              className="absolute right-2 size-10 top-2 z-10"
              icon={{
                className: 'size-full stroke-[1.5] text-black',
                Component: CloseIcon,
                name: 'close',
              }}
              onClick={handleClear}
            />
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <div
          id={`${props.name}-error`}
          className="flex items-center px-1.5 py-1.5 space-x-1.5 md:py-0.5 md:space-x-1"
          aria-live="assertive"
          role="alert"
        >
          <AlertTriangleImage size={16} />
          <label className="font-medium text-error-100 text-sm">
            {t(meta.error[0], { min: minLength })}
          </label>
        </div>
      )}
    </div>
  );
};
