import { useTranslations } from 'next-intl';

import { ProfilePic, Timestamp } from '@/components';
import { useCurrentUser } from '@/hooks';
import { CommentExtended } from '@/modules/posts/post/types';
import { Link } from '@/navigation';

import { PostCommentOptions } from './options/PostCommentOptions';

export const PostComment = ({
  createdAt,
  id,
  thoughts,
  user,
}: CommentExtended) => {
  const t = useTranslations();
  const currentUser = useCurrentUser();
  const isCommentMine = currentUser?.id === user?.id;

  return (
    <div
      aria-label={t('posts.post.footer.comments.user-comment', {
        user: user.name,
      })}
      className="group flex space-x-2"
      role="article"
    >
      <ProfilePic image={user?.image as string} name={user?.name as string} />
      <div>
        <div className="flex-align-center space-x-2">
          <div className="bg-primary mb-1 rounded-2xl px-3 py-2">
            <Link
              aria-label={t('links.visit-profile', { user: user.name })}
              className="text-primary font-semibold leading-tight hover:underline"
              href={`/${user.username}` as any}
            >
              {user?.name}
            </Link>
            <p className="text-primary">{thoughts}</p>
          </div>
          {isCommentMine && (
            <div className="opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
              <PostCommentOptions commentId={id} />
            </div>
          )}
        </div>
        <div className="ml-3">
          {createdAt ? (
            <Timestamp date={createdAt} />
          ) : (
            <div className="-mt-1">
              <span className="text-secondary text-xs">
                {t('action-loader.posting')}...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
