import classNames from 'classnames';

import { CloseIcon } from '@/assets/icons';
import { IconButton } from '@/components/buttons';

type CreatePostStepItemProps = {
  active: boolean;
  handleSelect: VoidFunction;
  isEven?: boolean;
  children: React.ReactNode;
};

export const CreatePostStepItem = ({
  active,
  handleSelect,
  isEven,
  children,
}: CreatePostStepItemProps) => (
  <div
    aria-pressed={active}
    className={classNames(
      'border-primary flex-between hover:bg-primary w-full space-x-2 border-b p-3 transition-colors duration-200 md:rounded-lg md:border-none md:py-2',
      {
        'bg-active': active,
        'border-r': isEven,
      }
    )}
    onClick={handleSelect}
    onKeyPress={(e) => {
      if (e.key === 'Enter' || e.key === ' ') handleSelect();
    }}
    role="button"
    tabIndex={0}
  >
    {children}
    {active && (
      <IconButton
        className="hover:bg-secondary size-6 p-px"
        icon={{
          ariaLabel: 'unselect-item',
          className: 'stroke-2 secondary-stroke size-full',
          Component: CloseIcon,
        }}
        onClick={handleSelect}
      />
    )}
  </div>
);
