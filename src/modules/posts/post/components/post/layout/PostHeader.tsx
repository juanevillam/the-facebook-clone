import { SavedPost, User } from '@prisma/client';
import classNames from 'classnames';

import { ProfilePic, Timestamp } from '@/components';
import { PostUserInfo } from '@/modules/posts/components';
import { Feeling } from '@/modules/posts/create/types';
import { PostExtended, PostVariant } from '@/modules/posts/post/types';

import { PostOptions } from './shared';

type PostHeaderProps = {
  post: PostExtended;
  variant?: PostVariant;
};

export const PostHeader = ({
  post: { createdAt, feeling, id, location, savedBy, user },
  variant,
}: PostHeaderProps) => {
  const isModal = variant === 'modal';

  return (
    <div className="flex items-start justify-between space-x-2 p-3 pr-1.5 md:relative md:items-center md:px-4 md:pr-3">
      <div className="flex w-full">
        <div
          className={classNames('mr-2 min-w-10', {
            'hidden md:block': isModal,
          })}
        >
          <ProfilePic image={user.image as string} name={user.name as string} />
        </div>
        <div>
          <PostUserInfo
            feeling={feeling as Feeling}
            hideFellingInfo
            isModal={isModal}
            location={location as string}
            name={user.name as string}
            username={user.username as string}
          />
          <Timestamp
            className={classNames({
              'text-secondary-dark md:text-secondary': isModal,
            })}
            date={createdAt}
          />
        </div>
      </div>
      <div className={classNames({ 'hidden md:block': isModal })}>
        <PostOptions
          isModal={isModal}
          postId={id}
          postSaves={savedBy}
          postUserId={user.id}
        />
      </div>
    </div>
  );
};
