import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { Drawer } from 'vaul';

import { ChevronRightIcon, HandThumbUpIcon } from '@/assets/icons';
import { ThumbUpImage } from '@/components/images';
import { LikeExtended } from '@/modules/posts/post/types';

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
  const liked = optimisticLikes.some(isMyLike);

  return (
    optimisticLikes.length > 0 && (
      <div className="flex-align-center justify-between p-2">
        <Drawer.NestedRoot>
          <Drawer.Trigger
            aria-label={t('view-likes')}
            className="flex-center transition-primary hover:bg-primary space-x-1.5 rounded-full py-1 pl-2"
          >
            <ThumbUpImage className="size-5" />
            <p className="text-primary text-lg font-medium">
              {liked && t('you')}
              {!liked && optimisticLikes.length}
              {liked &&
                optimisticLikes.length > 1 &&
                ` ${t('and')} ${optimisticLikes.length - 1} ${t('more')}`}
            </p>
            <ChevronRightIcon
              ariaHidden="true"
              className="primary-stroke size-6 fill-none stroke-[1.5]"
            />
          </Drawer.Trigger>
          <PostLikesBottomSheet optimisticLikes={optimisticLikes} />
        </Drawer.NestedRoot>
        <button
          aria-label={liked ? t('remove-like') : t('like-post')}
          className="flex-center transition-primary hover:bg-primary rounded-full p-1"
          onClick={handleOptimisticLike}
          type="button"
        >
          <HandThumbUpIcon
            className={classNames('size-7 stroke-[1.5]', {
              'fill-primary-100': liked,
              'primary-stroke fill-none': !liked,
            })}
            isActive={liked}
          />
        </button>
      </div>
    )
  );
};
