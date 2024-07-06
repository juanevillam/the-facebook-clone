import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Tooltip } from '@/components';
import { useAppSelector } from '@/lib/store/hooks';
import { POSTS_CREATE_LAYOUT_FOOTER_ITEMS_PATH } from '@/modules/posts/create/assets/translations';
import { CardItem } from '@/modules/posts/create/assets/types';

export const CreatePostDefaultStepFooterItem = ({
  active,
  disabled,
  name,
  onClick,
}: CardItem) => {
  const tItems = useTranslations(POSTS_CREATE_LAYOUT_FOOTER_ITEMS_PATH);
  const tItem = useTranslations(
    `${POSTS_CREATE_LAYOUT_FOOTER_ITEMS_PATH}.${name}`
  );

  const { activeGif } = useAppSelector((store) => store.posts.create.gifs);

  const tooltipLabel = disabled
    ? (tItems.rich('disabled', { br: () => <br /> }) as string)
    : tItem('detailed');

  return (
    <Tooltip label={tooltipLabel} position="bottom-9">
      <button
        aria-disabled={disabled}
        className={classNames(
          'flex-center main-border md:border-none main-transition peer justify-start md:justify-center p-3 md:p-0 relative w-full md:rounded-full md:size-9',
          {
            'active-bg hover:active-bg-hover': active && !disabled,
            'cursor-not-allowed opacity-50': disabled,
            'hover:main-bg-hover': !disabled,
            'justify-center': activeGif,
            'border-t': !activeGif,
          }
        )}
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        <Image
          alt={tItem('detailed')}
          className="size-6"
          height={72}
          loading="eager"
          src={`/images/${name}-icon.png`}
          quality={100}
          width={72}
        />
        <p
          className={classNames('md:hidden main-text ml-3 text-lg', {
            hidden: activeGif,
          })}
        >
          {tItem('detailed')}
        </p>
      </button>
    </Tooltip>
  );
};
