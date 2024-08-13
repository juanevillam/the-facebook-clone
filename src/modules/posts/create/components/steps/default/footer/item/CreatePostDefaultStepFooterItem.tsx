import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Tooltip } from '@/components';
import { useAppSelector } from '@/lib/store/hooks';
import { CardItem } from '@/modules/posts/create/assets/types';

export const CreatePostDefaultStepFooterItem = ({
  active,
  disabled,
  name,
  onClick,
}: CardItem) => {
  const tItems = useTranslations('posts.create.layout.footer');
  const tItem = useTranslations(`posts.create.layout.footer.${name}`);
  const { activeGif } = useAppSelector((store) => store.posts.create.gifs);
  const tooltipLabel = disabled
    ? (tItems.rich('disabled', { br: () => <br /> }) as string)
    : tItem('detailed');

  return (
    <Tooltip label={tooltipLabel} position="bottom-9">
      <button
        aria-disabled={disabled}
        className={classNames(
          'flex-center justify-start md:justify-center p-3 md:p-0 peer relative w-full md:rounded-full md:size-9',
          {
            'active-bg': active && !disabled,
            'cursor-not-allowed opacity-50': disabled,
            'primary-transition hover:primary-bg': !disabled,
            'justify-center': activeGif,
            'border-t md:border-none primary-border': !activeGif,
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
          className={classNames('ml-3 only-mobile primary-text text-lg', {
            hidden: activeGif,
          })}
        >
          {tItem('detailed')}
        </p>
      </button>
    </Tooltip>
  );
};
