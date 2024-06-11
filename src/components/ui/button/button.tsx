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
  className,
  disabled,
  fullWidth = false,
  label,
  loading,
  loadingLabel,
  onClick,
  size = 'lg',
  type,
  variant,
  children,
}: ButtonProps) => {
  return (
    <div className="flex justify-center w-full">
      <button
        className={`bg-primary-400 cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-primary-400 disabled:opacity-80 duration-150 flex items-center justify-center px-5 rounded-md text-white transition ${
          fullWidth && 'w-full'
        } ${
          variant === 'auth' &&
          'bg-transparent border border-smoke-200 hover:bg-gray-100 py-3.5'
        } ${variant === 'primary' && 'hover:bg-primary-200'}
        ${
          variant === 'secondary' &&
          'bg-success-100 disabled:hover:bg-success-100 hover:bg-success-200'
        } ${size === 'sm' && 'font-medium py-2.5'} ${
          size === 'md' && 'font-semibold py-3 text-base'
        } ${size === 'lg' && 'font-semibold py-3 text-lg'} ${className}`}
        disabled={disabled}
        onClick={onClick}
        type={type}
      >
        {children}
        {loading ? loadingLabel : label}
        {loading && <MoonLoader className="ml-2" color="#FFFFFF" size={22} />}
      </button>
    </div>
  );
};
