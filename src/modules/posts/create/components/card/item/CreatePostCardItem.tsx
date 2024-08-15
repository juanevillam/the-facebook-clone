import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { CardItem } from '../../../assets/types';

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
      className={classNames(
        'flex-center-justify-center primary-transition px-4 md:px-3 py-2.5 md:py-2 space-x-2 w-full md:rounded-lg hover:primary-bg',
        {
          'active-bg': active,
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
      <p className="only-desktop accent-text font-medium text-sm">
        {t('detailed')}
      </p>
      <p className="only-mobile primary-text text-sm">{t('short')}</p>
    </button>
  );
};
