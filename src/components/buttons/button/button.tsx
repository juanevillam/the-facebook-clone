import classNames from 'classnames';
import { MoonLoader } from 'react-spinners';

type ButtonProps = {
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
};

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
          'flex-center-justify-center primary-transition px-3.5 md:px-5 rounded-md text-white',
          {
            'w-full': fullWidth,
            'w-max': !fullWidth,
            'font-medium md:font-semibold p-1.5 md:py-2 text-lg md:text-sm uppercase md:normal-case':
              size === 'xs',
            'font-medium py-2.5': size === 'sm',
            'font-semibold py-3 text-base': size === 'md',
            'font-semibold py-3 text-lg': size === 'lg',
            'border primary-border-light py-3.5 hover:primary-bg-light':
              variant === 'auth',
            'bg-primary-100 hover:bg-primary-200 disabled:hover:bg-primary-100':
              variant === 'primary' || variant === 'tertiary',
            'bg-success-100 hover:bg-success-200 disabled:hover:bg-success-100':
              variant === 'secondary',
            'cursor-not-allowed opacity-80': disabled,
            'dark:bg-neutral-700 dark:disabled:hover:bg-neutral-700 md:dark:bg-neutral-600 md:dark:disabled:hover:bg-neutral-600 text-opacity-80 dark:text-opacity-40':
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
