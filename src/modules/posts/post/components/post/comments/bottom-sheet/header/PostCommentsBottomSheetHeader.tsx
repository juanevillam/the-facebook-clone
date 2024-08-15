import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { ChevronRightIcon, HandThumbUpIcon, LikeIcon } from '@/assets/ui/icons';
import { LikeExtended } from '@/modules/posts/post/assets/types';

type PostCommentsBottomSheetHeaderProps = {
  handleOptimisticLike: VoidFunction;
  isMyLike: (like: LikeExtended) => boolean;
  optimisticLikes: LikeExtended[];
};

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
          className="flex-center-justify-center primary-transition pl-2 py-1 rounded-full space-x-1.5 hover:primary-bg"
          type="button"
        >
          <LikeIcon className="size-5" />
          <p className="primary-text font-medium text-lg">
            {optimisticLikes.some(isMyLike) && t('you')}
            {!optimisticLikes.some(isMyLike) && optimisticLikes.length}
            {optimisticLikes.some(isMyLike) &&
              optimisticLikes.length > 1 &&
              ` ${t('and')} ${optimisticLikes.length - 1} ${t('more')}`}
          </p>
          <ChevronRightIcon className="stroke-[1.5] primary-stroke fill-none size-6" />
        </button>
        <button
          className="flex-center-justify-center primary-transition p-1 rounded-full hover:primary-bg"
          onClick={handleOptimisticLike}
        >
          <HandThumbUpIcon
            className={classNames('stroke-[1.5] size-7', {
              'fill-primary-100': optimisticLikes.some(isMyLike),
              'primary-stroke fill-none': !optimisticLikes.some(isMyLike),
            })}
            isActive={optimisticLikes.some(isMyLike)}
          />
        </button>
      </div>
    )
  );
};
