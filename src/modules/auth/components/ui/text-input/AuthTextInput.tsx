'use client';

import { Field, useField, useFormikContext } from 'formik';
import { useTranslations } from 'next-intl';

import { CloseIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { AlertTriangleImage } from '@/components/images';

export type AuthTextInputSkin = 'primary' | 'secondary';

export type AuthTextInputVariant = 'desktop' | 'mobile';

type AuthTextInputProps = {
  datatestid?: 'email-auth-text-input';
  disabled?: boolean;
  minLength?: number;
  name: string;
  placeholder: string;
  skin?: AuthTextInputSkin;
  type: 'text' | 'email' | 'password';
  variant?: AuthTextInputVariant;
};

export const AuthTextInput = (props: AuthTextInputProps) => {
  const {
    datatestid,
    disabled = false,
    minLength,
    name,
    placeholder,
    skin = 'primary',
    variant = 'desktop',
  } = props;

  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const t = useTranslations();

  const handleClear = () => {
    setFieldValue(name, '');
  };

  return (
    <div className="mb-4 w-full">
      {variant === 'desktop' ? (
        <Field
          autoComplete="on"
          aria-describedby={`${props.name}-error`}
          aria-invalid={meta.error && meta.touched ? 'true' : 'false'}
          aria-label={placeholder}
          className={`w-full rounded-md border border-gray-200 px-4 py-3.5 placeholder-gray-500 transition duration-150 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-100 ${
            skin === 'primary'
              ? 'bg-white hover:bg-gray-100'
              : 'bg-gray-100 hover:bg-gray-200'
          } ${
            meta.touched &&
            meta.error &&
            'ring-2 ring-error-100 focus:ring-error-100 md:mb-1'
          }`}
          data-testid={datatestid}
          disabled={disabled}
          {...field}
          {...props}
        />
      ) : (
        <div className={`relative h-12 w-full ${!meta.error && 'mb-[22px]'}`}>
          <input
            autoComplete="on"
            aria-label={placeholder}
            aria-invalid={meta.error && meta.touched ? 'true' : 'false'}
            className={`peer absolute left-0 top-0 z-10 h-[52px] w-full border-b-2 bg-transparent pl-3 pr-16 pt-2 outline-none focus:text-dark-100 ${
              meta.touched && meta.error
                ? 'border-b-error-100 focus:border-b-error-100'
                : 'border-b-gray-200 focus:border-b-primary-100'
            }`}
            data-testid={datatestid}
            disabled={disabled}
            {...field}
            {...props}
            placeholder=" "
          />
          <label
            className={`pointer-events-none absolute z-10 px-2 text-gray-500 transition-all duration-150 peer-focus:-top-[0.1rem] peer-focus:z-10 peer-focus:text-xs peer-focus:font-medium ${
              meta.touched && meta.error
                ? 'peer-focus:text-error-100'
                : 'peer-focus:text-primary-100'
            } ${field.value ? '-top-[0.1rem] text-xs font-medium' : 'top-4'}`}
          >
            {placeholder}
          </label>
          {field.value && (
            <IconButton
              className="absolute right-2 top-2 z-10 size-10"
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
          className="flex items-center space-x-1.5 px-1.5 py-1.5 md:space-x-1 md:py-0.5"
          aria-live="assertive"
          role="alert"
        >
          <AlertTriangleImage size={16} />
          <label className="text-sm font-medium text-error-100">
            {t(meta.error[0], { min: minLength })}
          </label>
        </div>
      )}
    </div>
  );
};
