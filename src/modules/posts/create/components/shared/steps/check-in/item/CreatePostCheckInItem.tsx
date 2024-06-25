import classNames from 'classnames';

import { CloseIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { Location } from '@/modules/posts/create/assets/types';

interface CreatePostCheckInItemProps {
  active: boolean;
  location: Location;
  onClick: (location: Location) => void;
}

export const CreatePostCheckInItem = ({
  location,
  onClick,
  active,
}: CreatePostCheckInItemProps) => {
  const { main_text, secondary_text } = location.structured_formatting;

  const handleSelect = () => onClick(location);

  return (
    <div
      aria-pressed={active}
      className={classNames(
        'border-b duration-150 flex hover:bg-gray-200 items-center justify-between px-3 py-2 text-start transition w-full dark:border-dark-50 dark:hover:bg-dark-600 md:border-none md:rounded-lg',
        {
          'bg-gray-300 dark:bg-dark-400': active,
        }
      )}
      onClick={handleSelect}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleSelect();
      }}
      role="button"
      tabIndex={0}
    >
      <div>
        <p className="text-gray-800 font-semibold dark:text-gray-200 md:font-bold">
          {main_text}
        </p>
        <p className="text-gray-600 dark:text-gray-300 md:dark:text-gray-400">
          {secondary_text}
        </p>
      </div>
      {active && (
        <IconButton
          className="hover:bg-gray-300 p-px size-6 dark:hover:bg-dark-500"
          icon={{
            className:
              'stroke-gray-500 size-full stroke-2 dark:stroke-gray-300 md:dark:stroke-gray-400',
            Component: CloseIcon,
            name: 'close',
          }}
          onClick={handleSelect}
        />
      )}
    </div>
  );
};
