import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { NavbarIconProps } from '@/assets/icons/navbar/types';

type PostFooterActionsItemProps = {
  className?: string;
  Icon: React.FC<NavbarIconProps>;
  isActive: boolean;
  isModal: boolean;
  label?: 'comment' | 'like' | 'share';
  onClick: VoidFunction;
};

export const PostFooterActionsItem = ({
  className,
  Icon,
  isActive,
  isModal,
  label,
  onClick,
}: PostFooterActionsItemProps) => {
  const t = useTranslations('posts.post.footer.actions');

  return (
    <div className={`w-full ${className}`}>
      <button
        aria-label={t(label)}
        className={classNames(
          'flex-center w-full space-x-2 px-4 py-2.5 transition-colors duration-200 ease-out md:rounded-lg md:px-3 md:py-2',
          {
            'hover:bg-neutral-700 hover:bg-opacity-50 md:hover:bg-gray-100 md:hover:bg-opacity-100 md:dark:hover:dark:bg-neutral-700':
              isModal,
            'hover:bg-primary hover:bg-opacity-100': !isModal,
          }
        )}
        onClick={onClick}
        type="button"
      >
        <Icon
          className={classNames('size-5 stroke-[1.5] md:size-6', {
            'fill-primary-100': isActive,
            'primary-stroke md:accent-stroke fill-none': !isActive,
            'primary-stroke-dark': !isActive && isModal,
          })}
          isActive={isActive}
        />
        <p
          className={classNames('text-sm md:font-medium', {
            'text-primary-100': isActive,
            'text-primary md:text-accent': !isActive,
            'text-primary-dark': isModal,
          })}
        >
          {t(label)}
        </p>
      </button>
    </div>
  );
};
