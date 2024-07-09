import { useTranslations } from 'next-intl';

import { ProfilePic, Timestamp } from '@/components';
import { CommentExtended } from '@/modules/posts/post/assets/types';

export const PostCommentsBottomSheetBodyItem = ({
  ...props
}: CommentExtended) => {
  const { createdAt, thoughts, user } = props;
  const t = useTranslations('action-loader');

  return (
    <div className="flex space-x-2">
      <ProfilePic image={user?.image as string} name={user?.name as string} />
      <div>
        <div className="primary-bg mb-1 px-3 py-2 rounded-2xl">
          <h1 className="font-semibold leading-tight primary-text">
            {user?.name}
          </h1>
          <p className="primary-text">{thoughts}</p>
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
