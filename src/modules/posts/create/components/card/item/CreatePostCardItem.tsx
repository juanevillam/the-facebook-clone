import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { POSTS_CREATE_LAYOUT_FOOTER_ITEMS_PATH } from '../../../assets/translations';
import { CardItem } from '../../../assets/types';

export const CreatePostCardItem = ({
  active,
  disabled,
  name,
  onClick,
}: CardItem) => {
  const t = useTranslations(`${POSTS_CREATE_LAYOUT_FOOTER_ITEMS_PATH}.${name}`);

  return (
    <button
      aria-disabled={disabled}
      className={classNames(
        'duration-150 flex items-center justify-center p-3 space-x-2 transition w-full md:p-2 md:rounded-lg hover:bg-gray-100 dark:hover:bg-dark-200',
        {
          'bg-gray-200 dark:bg-dark-400': active,
          'opacity-50': disabled,
        }
      )}
      onClick={onClick}
      type="button"
    >
      <Image
        alt={t('detailed')}
        className="size-5 md:size-6"
        height={72}
        loading="eager"
        src={`/images/${name}-icon.png`}
        quality={100}
        width={72}
      />
      <p className="font-medium hidden text-gray-600 text-sm dark:text-gray-300 md:block md:dark:text-gray-400">
        {t('detailed')}
      </p>
      <p className="text-gray-600 text-sm dark:text-gray-300 md:hidden md:dark:text-gray-400">
        {t('short')}
      </p>
    </button>
  );
};
