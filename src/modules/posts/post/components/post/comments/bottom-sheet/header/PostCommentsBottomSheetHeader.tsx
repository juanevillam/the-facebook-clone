import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { VoidFunction } from '@/assets/types';
import { ChevronRightIcon, HandThumbUpIcon, LikeIcon } from '@/assets/ui/icons';
import { LikeExtended } from '@/modules/posts/post/assets/types';

interface PostCommentsBottomSheetHeaderProps {
  handleOptimisticLike: VoidFunction;
  isMyLike: (like: LikeExtended) => boolean;
  optimisticLikes: LikeExtended[];
}

export const PostCommentsBottomSheetHeader = ({
  handleOptimisticLike,
  isMyLike,
  optimisticLikes,
}: PostCommentsBottomSheetHeaderProps) => {
  const t = useTranslations('posts.post.footer.likes');

  return (
    optimisticLikes.length > 0 && (
      <div className="flex-center justify-between p-2">
        <button
          className="flex-center-justify-center pl-2 py-1 primary-transition rounded-full space-x-1.5 hover:primary-bg"
          type="button"
        >
          <LikeIcon className="size-5" />
          <p className="font-medium primary-text text-lg">
            {optimisticLikes.some(isMyLike) && t('you')}
            {!optimisticLikes.some(isMyLike) && optimisticLikes.length}
            {optimisticLikes.some(isMyLike) &&
              optimisticLikes.length > 1 &&
              ` ${t('and')} ${optimisticLikes.length - 1} ${t('more')}`}
          </p>
          <ChevronRightIcon className="fill-none primary-stroke size-6 stroke-[1.5]" />
        </button>
        <button
          className="flex-center-justify-center p-1 primary-transition rounded-full hover:primary-bg"
          onClick={handleOptimisticLike}
        >
          <HandThumbUpIcon
            className={classNames('size-7 stroke-[1.5]', {
              'fill-primary-100': optimisticLikes.some(isMyLike),
              'fill-none primary-stroke': !optimisticLikes.some(isMyLike),
            })}
            isActive={optimisticLikes.some(isMyLike)}
          />
        </button>
      </div>
    )
  );
};
