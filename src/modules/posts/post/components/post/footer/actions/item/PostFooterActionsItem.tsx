import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { VoidFunction } from '@/assets/types';
import { NavbarIconProps } from '@/assets/ui/icons/navbar/types';

interface PostFooterActionsItemProps {
  Icon: React.FC<NavbarIconProps>;
  isActive: boolean;
  label: 'comment' | 'like' | 'share';
  onClick: VoidFunction;
}

export const PostFooterActionsItem = ({
  Icon,
  isActive,
  label,
  onClick,
}: PostFooterActionsItemProps) => {
  const t = useTranslations('posts.post.footer.actions');

  return (
    <div className="w-full">
      <button
        className="flex-center-justify-center primary-transition px-4 md:px-3 py-2.5 md:py-2 space-x-2 w-full md:rounded-lg hover:primary-bg"
        onClick={onClick}
        type="button"
      >
        <Icon
          className={classNames('size-5 stroke-[1.5] md:size-6', {
            'fill-primary-100': isActive,
            'fill-none primary-stroke md:accent-stroke': !isActive,
          })}
          isActive={isActive}
        />
        <p
          className={classNames('text-sm md:font-medium', {
            'text-primary-100': isActive,
            'primary-text md:accent-text': !isActive,
          })}
        >
          {t(label)}
        </p>
      </button>
    </div>
  );
};
