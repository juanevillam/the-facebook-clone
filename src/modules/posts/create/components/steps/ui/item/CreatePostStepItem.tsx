import classNames from 'classnames';

import { VoidFunction } from '@/assets/types';
import { CloseIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';

interface CreatePostStepItemProps {
  active: boolean;
  handleSelect: VoidFunction;
  isEven?: boolean;
  children: React.ReactNode;
}

export const CreatePostStepItem = ({
  active,
  handleSelect,
  isEven,
  children,
}: CreatePostStepItemProps) => {
  return (
    <div
      aria-pressed={active}
      className={classNames(
        'flex-justify-between-center border-b main-border md:border-none main-transition px-3 py-3 md:py-2 space-x-2 w-full md:rounded-lg hover:active-bg-hover',
        {
          'active-bg': active,
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
          className="p-px size-6 hover:main-bg-hover"
          icon={{
            className: 'stroke-2 secondary-stroke size-full',
            Component: CloseIcon,
            name: 'close',
          }}
          onClick={handleSelect}
        />
      )}
    </div>
  );
};
