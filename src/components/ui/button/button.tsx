import React from 'react';

import { MoonLoader } from 'react-spinners';

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
  loadingLabel?: string;
  loading?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  type: 'button' | 'submit';
  variant: 'auth' | 'primary' | 'secondary';
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
  const baseStyles =
    'duration-150 flex items-center justify-center px-5 rounded-md text-white transition';

  const fullWidthStyles = fullWidth ? 'w-full' : 'w-max';

  const sizeStyles = {
    sm: 'font-medium py-2.5',
    md: 'font-semibold py-3 text-base',
    lg: 'font-semibold py-3 text-lg',
  }[size];

  const variantStyles = {
    auth: 'bg-transparent border border-gray-200 hover:bg-gray-100 py-3.5',
    primary:
      'bg-primary-100 hover:bg-primary-200 disabled:hover:bg-primary-100',
    secondary:
      'bg-success-100 hover:bg-success-200 disabled:hover:bg-success-100',
  }[variant];

  const disabledStyles = disabled
    ? 'cursor-not-allowed opacity-80'
    : 'cursor-pointer';

  return (
    <div className={`flex justify-center w-full ${className}`}>
      <button
        aria-busy={loading}
        aria-live="polite"
        className={`${baseStyles} ${fullWidthStyles} ${sizeStyles} ${variantStyles} ${disabledStyles}`}
        disabled={disabled}
        onClick={onClick}
        type={type}
      >
        {children}
        {loading ? (
          <>
            {loadingLabel}
            {size == 'sm' ? (
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
