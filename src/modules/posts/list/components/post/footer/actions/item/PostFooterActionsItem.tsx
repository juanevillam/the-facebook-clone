import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { VoidFunction } from '@/assets/types';
import { NavbarIconProps } from '@/assets/ui/icons/navbar/types';

interface PostFooterActionsItemProps {
  Icon: React.FC<NavbarIconProps>;
  isActive: boolean;
  label: 'comment' | 'like' | 'share';
  onClick?: VoidFunction;
  type: 'button' | 'submit';
}

export const PostFooterActionsItem = ({
  Icon,
  isActive,
  label,
  onClick,
  type,
}: PostFooterActionsItemProps) => {
  const t = useTranslations('posts.post.footer.actions');

  return (
    <button
      className="flex-center-justify-center hover:active-bg-hover main-transition p-2.5 md:p-2 space-x-2 w-full md:rounded-md"
      onClick={onClick}
      type={type}
    >
      <Icon
        className={classNames('size-6', {
          'fill-primary-100': isActive,
          'secondary-stroke fill-none': !isActive,
        })}
        isActive={isActive}
      />
      <p
        className={classNames('font-medium text-sm md:text-base', {
          'text-primary-100': isActive,
          'secondary-text': !isActive,
        })}
      >
        {t(label)}
      </p>
    </button>
  );
};
