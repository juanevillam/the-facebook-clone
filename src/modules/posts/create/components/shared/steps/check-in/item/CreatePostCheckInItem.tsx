import classNames from 'classnames';

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
    <button
      aria-pressed={active}
      className={classNames(
        'duration-150 hover:bg-gray-200 px-3 py-2 text-start rounded-lg transition w-full dark:hover:bg-dark-600',
        {
          'bg-gray-300 dark:bg-dark-400': active,
        }
      )}
      onClick={handleSelect}
      type="button"
    >
      <p className="text-gray-800 font-bold dark:text-gray-200">{main_text}</p>
      <p className="text-gray-600 dark:text-gray-400">{secondary_text}</p>
    </button>
  );
};
