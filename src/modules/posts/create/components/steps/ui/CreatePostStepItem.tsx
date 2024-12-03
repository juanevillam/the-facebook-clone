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
}: CreatePostStepItemProps) => {
  return (
    <div
      aria-pressed={active}
      className={classNames(
        'primary-border primary-transition flex-center-justify-between hover:primary-bg w-full space-x-2 border-b p-3 md:rounded-lg md:border-none md:py-2',
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
          className="hover:secondary-bg size-6 p-px"
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
};
