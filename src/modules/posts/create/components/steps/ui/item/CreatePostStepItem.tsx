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
        'border-b md:border-none flex-center-justify-between primary-border primary-transition px-3 py-3 md:py-2 space-x-2 w-full md:rounded-lg hover:primary-bg',
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
          className="p-px size-6 hover:secondary-bg"
          icon={{
            className: 'secondary-stroke size-full stroke-2',
            Component: CloseIcon,
            name: 'close',
          }}
          onClick={handleSelect}
        />
      )}
    </div>
  );
};
