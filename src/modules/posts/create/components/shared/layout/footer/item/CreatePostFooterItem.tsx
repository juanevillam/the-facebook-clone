import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { ImageType, VoidFunction } from '@/assets/types';
import { Tooltip } from '@/components';

interface CreatePostFooterItemProps {
  active: boolean;
  disabled?: boolean;
  image: ImageType;
  onClick: VoidFunction;
}

export const CreatePostFooterItem = ({
  active,
  disabled,
  image,
  onClick,
}: CreatePostFooterItemProps) => {
  const t = useTranslations('posts.create.actions');

  const tooltipLabel = disabled
    ? (t.rich('disabled', { br: () => <br /> }) as string)
    : t(`${image.src}.desktop`);

  return (
    <Tooltip label={tooltipLabel} position="bottom-9">
      <button
        aria-disabled={disabled}
        className={classNames(
          'border-b duration-150 flex items-center justify-start peer px-4 py-3 relative transition w-full dark:border-dark-50 md:border-none md:justify-center md:p-0 md:rounded-full md:size-9',
          {
            'bg-gray-100 dark:bg-dark-400': active,
            'hover:bg-gray-200 dark:hover:bg-dark-200': !disabled,
            'cursor-not-allowed opacity-50 hover:bg-transparent dark:hover:bg-transparent':
              disabled,
            peer: !disabled,
          }
        )}
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        <Image
          alt={image.alt}
          height={24}
          loading="eager"
          src={`/images/${image.src}-icon.png`}
          width={24}
        />
        <p className="ml-3 dark:text-gray-100 md:hidden">{image.alt}</p>
      </button>
    </Tooltip>
  );
};
