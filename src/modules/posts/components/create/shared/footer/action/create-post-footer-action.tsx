import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { imageType, voidFunctionType } from '@/assets/types';
import { Tooltip } from '@/components';

interface CreatePostFooterActionProps {
  active: boolean;
  disabled?: boolean;
  image: imageType;
  onClick: voidFunctionType;
}

export const CreatePostFooterAction = ({
  active,
  disabled,
  image,
  onClick,
}: CreatePostFooterActionProps) => {
  const t = useTranslations('posts.create.actions');

  return (
    <Tooltip
      label={
        disabled
          ? (t.rich('disabled', {
              br: () => <br />,
            }) as string)
          : t(`${image.src}.desktop`)
      }
      position="bottom-9"
    >
      <button
        className={`border-b duration-150 flex hover:bg-gray-200 items-center peer px-4 py-3 relative transition w-full md:border-none md:justify-center md:p-0 md:rounded-full md:size-9 dark:border-dark-50 dark:hover:bg-dark-200 ${
          active && 'bg-gray-100 dark:bg-dark-400'
        } ${disabled && 'cursor-not-allowed opacity-50'}`}
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
        <p className="md:hidden ml-3 dark:text-gray-100">{image.alt}</p>
      </button>
    </Tooltip>
  );
};
