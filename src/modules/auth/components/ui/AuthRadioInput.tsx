'use client';

import classNames from 'classnames';
import { Field, useField } from 'formik';

type AuthRadioInputProps = {
  label: string;
  name: string;
  value: string;
  [x: string]: any;
};

export const AuthRadioInput = (props: AuthRadioInputProps) => {
  const { label, name, value } = props;
  const [field, meta] = useField({ ...props, type: 'radio' });

  return (
    <label
      className={classNames(
        'border-primary-light-full flex-between mb-4 w-full cursor-pointer rounded-md border px-4 py-3.5',
        {
          'ring-2 ring-error-100': meta.touched && meta.error,
        }
      )}
      htmlFor={`${name}-${value}`}
    >
      <span id={`${name}-${value}-label`}>{label}</span>
      <Field
        aria-checked={field.checked}
        aria-invalid={meta.error && meta.touched ? 'true' : 'false'}
        aria-labelledby={`${name}-${value}-label`}
        className="sr-only"
        id={`${name}-${value}`}
        type="radio"
        {...field}
      />
      <span
        className={classNames('flex-center size-4 rounded-full border-2', {
          'border-primary-100 bg-primary-100': field.checked,
          'border-gray-300': !field.checked,
        })}
      >
        {field.checked && <span className="size-2 rounded-full bg-white" />}
      </span>
    </label>
  );
};
