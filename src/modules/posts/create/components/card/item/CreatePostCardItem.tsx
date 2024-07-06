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
        'flex-justify-center-center main-transition px-4 md:px-3 py-2.5 md:py-2 space-x-2 w-full md:rounded-lg hover:main-bg-hover',
        {
          'active-bg hover:active-bg-hover': active,
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
      <p className="only-desktop font-medium text-gray-500 dark:text-gray-300 text-sm">
        {t('detailed')}
      </p>
      <p className="only-mobile text-gray-600 dark:text-neutral-100 text-sm">
        {t('short')}
      </p>
    </button>
  );
};
