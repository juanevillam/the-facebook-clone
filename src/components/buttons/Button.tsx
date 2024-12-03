import classNames from 'classnames';
import { MoonLoader } from 'react-spinners';

type ButtonProps = {
  ariaLabel?: string;
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
  ariaLabel = '',
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
    <button
      aria-busy={loading}
      aria-label={ariaLabel || (loading ? loadingLabel : label)}
      aria-live="polite"
      className={classNames(
        'flex-center-justify-center primary-transition rounded-md px-3.5 text-white md:px-5',
        {
          'w-full': fullWidth,
          'w-max': !fullWidth,
          'p-1.5 text-lg font-medium uppercase md:py-2 md:text-sm md:font-semibold md:normal-case':
            size === 'xs',
          'py-2.5 font-medium': size === 'sm',
          'py-3 text-base font-semibold': size === 'md',
          'py-3 text-lg font-semibold': size === 'lg',
          'primary-border-light hover:primary-bg-light border py-3.5':
            variant === 'auth',
          'bg-primary-100 hover:bg-primary-200 disabled:hover:bg-primary-100':
            variant === 'primary' || variant === 'tertiary',
          'bg-success-100 hover:bg-success-200 disabled:hover:bg-success-100':
            variant === 'secondary',
          'cursor-not-allowed opacity-80': disabled,
          'text-opacity-80 dark:bg-neutral-700 dark:text-opacity-40 dark:disabled:hover:bg-neutral-700 md:dark:bg-neutral-600 md:dark:disabled:hover:bg-neutral-600':
            disabled && variant === 'tertiary',
        }
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {loading ? (
        <>
          <span>{loadingLabel}</span>
          <MoonLoader
            className="ml-2"
            color="#FFFFFF"
            size={size === 'xs' ? 14 : size === 'sm' ? 18 : 22}
            aria-hidden="true"
          />
        </>
      ) : (
        label || children
      )}
    </button>
  );
};
