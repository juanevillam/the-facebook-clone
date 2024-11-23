import { SavedPost } from '@prisma/client';
import classNames from 'classnames';

import { ProfilePic, Timestamp } from '@/components';
import { PostUserInfo } from '@/modules/posts/components';
import { Feeling } from '@/modules/posts/create/assets/types';
import { PostVariant } from '@/modules/posts/post/types';

import { PostOptions } from '../common';

type PostHeaderProps = {
  createdAt: Date;
  feeling?: Feeling;
  image?: string;
  location?: string;
  name: string;
  postId: string;
  postSaves: SavedPost[];
  postUserId: string;
  variant?: PostVariant;
};

export const PostHeader = ({
  createdAt,
  feeling,
  image,
  location,
  name,
  postId,
  postSaves,
  postUserId,
  variant = 'page',
}: PostHeaderProps) => {
  const isModal = variant === 'modal';

  return (
    <div className="flex items-start justify-between space-x-2 p-3 pr-1.5 md:relative md:items-center md:px-4 md:pr-3">
      <div className="flex w-full">
        <div className={classNames('mr-2', { 'hidden md:block': isModal })}>
          <ProfilePic image={image} name={name} />
        </div>
        <div>
          <PostUserInfo
            feeling={feeling}
            hideFellingInfo
            isModal={isModal}
            location={location}
            name={name}
          />
          <Timestamp
            className={classNames({
              'secondary-text-dark md:secondary-text': isModal,
            })}
            date={createdAt}
          />
        </div>
      </div>
      <div className={classNames({ 'hidden md:block': isModal })}>
        <PostOptions
          isModal={isModal}
          postId={postId}
          postSaves={postSaves}
          postUserId={postUserId}
        />
      </div>
    </div>
  );
};
