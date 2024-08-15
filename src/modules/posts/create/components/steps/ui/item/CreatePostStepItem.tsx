import classNames from 'classnames';

import { CloseIcon } from '@/assets/ui/icons';
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
}: CreatePostStepItemProps) => {
  return (
    <div
      aria-pressed={active}
      className={classNames(
        'border-b md:border-none primary-border primary-transition flex-center-justify-between px-3 py-3 md:py-2 space-x-2 w-full md:rounded-lg hover:primary-bg',
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
