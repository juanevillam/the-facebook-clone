import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { Drawer } from 'vaul';

import { ChevronRightIcon, HandThumbUpIcon } from '@/assets/ui/icons';
import { ThumbUpImage } from '@/components/images';
import { LikeExtended } from '@/modules/posts/post/assets/types';

import { PostLikesBottomSheet } from '../../likes';

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
        <Drawer.NestedRoot>
          <Drawer.Trigger className="flex-center-justify-center primary-transition hover:primary-bg space-x-1.5 rounded-full py-1 pl-2">
            <ThumbUpImage className="size-5" />
            <p className="primary-text text-lg font-medium">
              {optimisticLikes.some(isMyLike) && t('you')}
              {!optimisticLikes.some(isMyLike) && optimisticLikes.length}
              {optimisticLikes.some(isMyLike) &&
                optimisticLikes.length > 1 &&
                ` ${t('and')} ${optimisticLikes.length - 1} ${t('more')}`}
            </p>
            <ChevronRightIcon className="primary-stroke size-6 fill-none stroke-[1.5]" />
          </Drawer.Trigger>
          <PostLikesBottomSheet optimisticLikes={optimisticLikes} />
        </Drawer.NestedRoot>
        <button
          className="flex-center-justify-center primary-transition hover:primary-bg rounded-full p-1"
          onClick={handleOptimisticLike}
        >
          <HandThumbUpIcon
            className={classNames('size-7 stroke-[1.5]', {
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
