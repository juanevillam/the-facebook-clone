import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { NavbarIconProps } from '@/assets/ui/icons/navbar/types';

type PostFooterActionsItemProps = {
  className?: string;
  Icon: React.FC<NavbarIconProps>;
  isActive: boolean;
  isPostContent: boolean;
  label?: 'comment' | 'like' | 'share';
  onClick: VoidFunction;
};

export const PostFooterActionsItem = ({
  className,
  Icon,
  isActive,
  isPostContent,
  label,
  onClick,
}: PostFooterActionsItemProps) => {
  const t = useTranslations('posts.post.footer.actions');

  return (
    <div className={`w-full ${className}`}>
      <button
        className={classNames(
          'flex-center-justify-center primary-transition w-full space-x-2 px-4 py-2.5 md:rounded-lg md:px-3 md:py-2',
          {
            'hover:bg-neutral-700 hover:bg-opacity-50 md:hover:bg-gray-100 md:hover:bg-opacity-100 md:dark:hover:dark:bg-neutral-700':
              isPostContent,
            'hover:primary-bg hover:bg-opacity-100': !isPostContent,
          }
        )}
        onClick={onClick}
        type="button"
      >
        <Icon
          className={classNames('size-5 stroke-[1.5] md:size-6', {
            'fill-primary-100': isActive,
            'primary-stroke md:accent-stroke fill-none': !isActive,
            'primary-stroke-dark': !isActive && isPostContent,
          })}
          isActive={isActive}
        />
        <p
          className={classNames('text-sm md:font-medium', {
            'text-primary-100': isActive,
            'primary-text md:accent-text': !isActive,
            'primary-text-dark md:hidden': isPostContent,
          })}
        >
          {t(label)}
        </p>
      </button>
    </div>
  );
};
