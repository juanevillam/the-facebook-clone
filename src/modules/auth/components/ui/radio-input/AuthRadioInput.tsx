'use client';

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
      className={`primary-border-light-full flex-center-justify-between mb-4 w-full cursor-pointer rounded-md border px-4 py-3.5 ${
        meta.touched && meta.error && 'ring-2 ring-error-100'
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
        className={`flex-center-justify-center size-4 rounded-full border-2 ${
          field.checked
            ? 'border-primary-100 bg-primary-100'
            : 'border-gray-300'
        }`}
      >
        {field.checked && <span className="size-2 rounded-full bg-white" />}
      </span>
    </label>
  );
};
