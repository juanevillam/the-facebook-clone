'use client';

import { Field, useField } from 'formik';

interface AuthRadioInputProps {
  label: string;
  name: string;
  value: string;
  [x: string]: any;
}

export const AuthRadioInput = (props: AuthRadioInputProps) => {
  const { label, name, value } = props;
  const [field, meta] = useField({ ...props, type: 'radio' });

  return (
    <label
      className={`border border-smoke-300 cursor-pointer flex items-center justify-between mb-4 px-4 py-3.5 rounded-md w-full ${
        meta.touched && meta.error && 'ring-error-100 ring-2'
      }`}
      htmlFor={`${name}-${value}`}
    >
      {label}
      <Field
        aria-labelledby={`${name}-${value}-label`}
        aria-checked={field.checked}
        aria-invalid={meta.error && meta.touched ? 'true' : 'false'}
        className="sr-only"
        id={`${name}-${value}`}
        type="radio"
        {...field}
      />
      <span
        className={`border-2 flex items-center justify-center rounded-full size-4 ${
          field.checked
            ? 'bg-primary-100 border-primary-100'
            : 'border-gray-300'
        }`}
      >
        {field.checked && <span className="bg-white rounded-full size-2" />}
      </span>
    </label>
  );
};
