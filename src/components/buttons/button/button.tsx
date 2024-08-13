import React from 'react';

import classNames from 'classnames';
import { MoonLoader } from 'react-spinners';

import { VoidFunction } from '@/assets/types';

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
  loadingLabel?: string;
  loading?: boolean;
  onClick?: VoidFunction;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  type: 'button' | 'submit';
  variant: 'auth' | 'primary' | 'secondary' | 'tertiary';
  children?: React.ReactNode;
}

export const Button = ({
  className = '',
  disabled = false,
  fullWidth = false,
  label,
  loading = false,
  loadingLabel,
  onClick,
  size = 'lg',
  type,
  variant,
  children,
}: ButtonProps) => {
  return (
    <div className={`flex justify-center w-full ${className}`}>
      <button
        aria-busy={loading}
        aria-live="polite"
        className={classNames(
          'duration-150 flex items-center justify-center px-3.5 rounded-md text-white transition md:px-5',
          {
            'w-full': fullWidth,
            'w-max': !fullWidth,
            'font-medium p-1.5 text-lg uppercase md:font-semibold md:normal-case md:py-2 md:text-sm':
              size === 'xs',
            'font-medium py-2.5': size === 'sm',
            'font-semibold py-3 text-base': size === 'md',
            'font-semibold py-3 text-lg': size === 'lg',
            'bg-transparent border border-gray-200 hover:bg-gray-100 py-3.5':
              variant === 'auth',
            'bg-primary-100 hover:bg-primary-200 disabled:hover:bg-primary-100':
              variant === 'primary' || variant === 'tertiary',
            'bg-success-100 hover:bg-success-200 disabled:hover:bg-success-100':
              variant === 'secondary',
            'cursor-not-allowed opacity-80': disabled,
            'text-opacity-80 dark:bg-dark-900 dark:disabled:hover:bg-dark-900 dark:text-opacity-40 md:dark:bg-dark-800 md:dark:disabled:hover:bg-dark-800':
              disabled && variant === 'tertiary',
          }
        )}
        disabled={disabled}
        onClick={onClick}
        type={type}
      >
        {children}
        {loading ? (
          <>
            {loadingLabel}
            {size == 'xs' ? (
              <MoonLoader className="ml-2" color="#FFFFFF" size={14} />
            ) : size == 'sm' ? (
              <MoonLoader className="ml-2" color="#FFFFFF" size={18} />
            ) : (
              <MoonLoader className="ml-2" color="#FFFFFF" size={22} />
            )}
          </>
        ) : (
          label
        )}
      </button>
    </div>
  );
};
