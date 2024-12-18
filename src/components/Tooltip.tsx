import classNames from 'classnames';

type TooltipProps = {
  label: string;
  position: string;
  variant?: 'medium' | 'small';
  children: React.ReactNode;
};

export const Tooltip = ({
  label,
  position,
  variant = 'medium',
  children,
}: TooltipProps) => (
  <div className="relative w-full md:w-max">
    {children}
    <div
      className={classNames(
        `bg-active-inverse text-primary-inverse pointer-events-none absolute left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg text-xs opacity-95 md:peer-hover:block ${position}`,
        {
          'px-3.5 py-2.5': variant === 'medium',
          'px-3 py-2': variant === 'small',
        }
      )}
      role="tooltip"
    >
      {label}
    </div>
  </div>
);
