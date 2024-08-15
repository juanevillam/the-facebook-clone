import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { NavbarIconProps } from '@/assets/ui/icons/navbar/types';

type PostFooterActionsItemProps = {
  Icon: React.FC<NavbarIconProps>;
  isActive: boolean;
  label?: 'comment' | 'like' | 'share';
  onClick: VoidFunction;
  showLabel?: boolean;
};

export const PostFooterActionsItem = ({
  Icon,
  isActive,
  label,
  onClick,
  showLabel = true,
}: PostFooterActionsItemProps) => {
  const t = useTranslations('posts.post.footer.actions');

  return (
    <div className="w-full">
      <button
        className="flex-center-justify-center primary-transition hover:primary-bg w-full space-x-2 px-4 py-2.5 md:rounded-lg md:px-3 md:py-2"
        onClick={onClick}
        type="button"
      >
        <Icon
          className={classNames('size-5 stroke-[1.5] md:size-6', {
            'fill-primary-100': isActive,
            'primary-stroke md:accent-stroke fill-none': !isActive,
          })}
          isActive={isActive}
        />
        {showLabel && (
          <p
            className={classNames('text-sm md:font-medium', {
              'text-primary-100': isActive,
              'primary-text md:accent-text': !isActive,
            })}
          >
            {t(label)}
          </p>
        )}
      </button>
    </div>
  );
};
