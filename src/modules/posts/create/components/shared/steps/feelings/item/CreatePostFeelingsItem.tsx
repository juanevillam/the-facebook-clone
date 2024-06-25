import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { CloseIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { POSTS_CREATE_STEPS_FEELINGS_PATH } from '@/modules/posts/create/assets/translations';
import { Feeling } from '@/modules/posts/create/assets/types';

interface CreatePostFeelingsItemProps {
  active: boolean;
  isEven?: boolean;
  name: Feeling;
  onClick: (feeling: Feeling) => void;
}

export const CreatePostFeelingsItem = ({
  active,
  isEven,
  name,
  onClick,
}: CreatePostFeelingsItemProps) => {
  const t = useTranslations(`${POSTS_CREATE_STEPS_FEELINGS_PATH}.list`);

  const handleSelect = () => onClick(name);

  return (
    <div
      aria-pressed={active}
      className={classNames(
        'border-b duration-150 flex hover:bg-gray-200 items-center justify-between p-3 transition w-full dark:border-dark-50 dark:hover:bg-dark-600 md:border-none md:p-2 md:rounded-lg',
        {
          'bg-gray-100 dark:bg-dark-400 md:bg-gray-300': active,
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
      <div className="flex items-center space-x-2.5">
        <div className="bg-gray-200 duration-150 relative rounded-full transition dark:bg-dark-600 md:p-2">
          <Image
            alt={t(name)}
            height={168}
            className="size-8 md:size-5"
            loading="eager"
            src={`/images/feelings/${name}-icon.png`}
            quality={100}
            width={168}
          />
        </div>
        <span className="dark:text-gray-200">{t(name)}</span>
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
