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
  const t = useTranslations('posts.create.layout.footer');
  const { activeGif } = useAppSelector((store) => store.posts.create.gifs);
  const tooltipLabel = disabled
    ? (t.rich('disabled', {
        br: () => <br />,
      }) as string)
    : t(`${name}.detailed`);

  return (
    <Tooltip label={tooltipLabel} position="bottom-9">
      <button
        aria-disabled={disabled}
        className={classNames(
          'peer flex-center justify-start md:justify-center p-3 md:p-0 relative w-full md:rounded-full md:size-9',
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
          alt={t(`${name}.detailed`)}
          className="size-6"
          height={72}
          loading="eager"
          src={`/images/${name}-icon.png`}
          quality={100}
          width={72}
        />
        <p
          className={classNames('only-mobile primary-text ml-3 text-lg', {
            hidden: activeGif,
          })}
        >
          {t(`${name}.detailed`)}
        </p>
      </button>
    </Tooltip>
  );
};
