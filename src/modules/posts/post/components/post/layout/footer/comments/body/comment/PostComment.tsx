import { useTranslations } from 'next-intl';

import { ProfilePic, Timestamp } from '@/components';
import { useCurrentUser } from '@/hooks';
import { CommentExtended } from '@/modules/posts/post/assets/types';

import { PostCommentOptions } from './options/PostCommentOptions';

export const PostComment = ({
  createdAt,
  id,
  thoughts,
  user,
}: CommentExtended) => {
  const t = useTranslations('action-loader');
  const currentUser = useCurrentUser();
  const isCommentMine = currentUser?.id === user?.id;

  return (
    <div className="group flex space-x-2">
      <ProfilePic image={user?.image as string} name={user?.name as string} />
      <div>
        <div className="flex-center space-x-2">
          <div>
            <div className="primary-bg mb-1 rounded-2xl px-3 py-2">
              <h1 className="primary-text font-semibold leading-tight">
                {user?.name}
              </h1>
              <p className="primary-text">{thoughts}</p>
            </div>
          </div>
          {isCommentMine && (
            <div className="group-hover:block md:hidden">
              <PostCommentOptions commentId={id} />
            </div>
          )}
        </div>
        <div className="ml-3">
          {createdAt ? (
            <Timestamp date={createdAt} />
          ) : (
            <div className="-mt-1">
              <span className="secondary-text text-xs">{t('posting')}...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};