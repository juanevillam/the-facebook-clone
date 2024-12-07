import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { CardItem } from '../../types';

export const CreatePostCardItem = ({
  active,
  disabled,
  name,
  onClick,
}: CardItem) => {
  const t = useTranslations(`posts.create.layout.footer.${name}`);

  return (
    <button
      aria-disabled={disabled}
      aria-label={t('detailed')}
      aria-pressed={active && !disabled}
      className={classNames(
        'flex-center w-full space-x-2 px-4 py-2.5 transition-colors duration-200 md:rounded-lg md:px-3 md:py-2',
        {
          'bg-active': active && !disabled,
          'cursor-not-allowed opacity-50': disabled,
          'hover:bg-primary': !disabled,
        }
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Image
        alt={t('detailed')}
        className="size-5 transition-transform duration-200 hover:scale-110 md:size-6"
        height={72}
        loading="eager"
        src={`/images/${name}-icon.png`}
        quality={100}
        width={72}
      />
      <p className="responsive-desktop-only text-accent text-sm font-medium transition-colors duration-200">
        {t('detailed')}
      </p>
      <p className="responsive-mobile-only text-primary text-sm transition-colors duration-200">
        {t('short')}
      </p>
    </button>
  );
};
