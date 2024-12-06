import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Tooltip } from '@/components';
import { IS_PRODUCTION } from '@/constants/environment';
import { useAppSelector } from '@/lib/store/hooks';
import { CardItem } from '@/modules/posts/create/types';

export const CreatePostDefaultStepFooterItem = ({
  active,
  disabled,
  name,
  onClick,
}: CardItem) => {
  const t = useTranslations('posts.create.layout.footer');
  const { activeGif } = useAppSelector(
    (store) => store.posts.createPost.createPostGifsStep
  );

  const tooltipLabel =
    disabled && name === 'gif'
      ? IS_PRODUCTION
        ? (t.rich(`${name}.disabled-prod`, {
            br: () => <br />,
          }) as string)
        : (t.rich('media.disabled', {
            br: () => <br />,
          }) as string)
      : disabled && name === 'photo-video'
        ? (t.rich('media.disabled', {
            br: () => <br />,
          }) as string)
        : t(`${name}.detailed`);

  return (
    <Tooltip label={tooltipLabel} position="bottom-9">
      <button
        aria-disabled={disabled}
        aria-label={t(`${name}.detailed`)}
        className={classNames(
          'flex-align-center peer relative w-full justify-start p-3 transition-colors duration-200 md:size-9 md:justify-center md:rounded-full md:p-0',
          {
            'bg-active': active && !disabled,
            'cursor-not-allowed opacity-50': disabled,
            'hover:bg-primary': !disabled,
            'justify-center': activeGif,
            'border-primary border-t md:border-none': !activeGif,
          }
        )}
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        <Image
          alt={t(`${name}.detailed`)}
          className="size-6 transition-transform duration-200 hover:scale-105"
          height={72}
          loading="eager"
          src={`/images/${name}-icon.png`}
          quality={100}
          width={72}
        />
        <p
          className={classNames(
            'responsive-mobile-only text-primary ml-3 text-lg',
            {
              hidden: activeGif,
            }
          )}
        >
          {t(`${name}.detailed`)}
        </p>
      </button>
    </Tooltip>
  );
};
