import { SavedPost } from '@prisma/client';
import classNames from 'classnames';

import { ProfilePic, Timestamp } from '@/components';
import { PostUserInfo } from '@/modules/posts/components';
import { Feeling } from '@/modules/posts/create/assets/types';

import { PostOptions } from '../options/PostOptions';

type PostHeaderProps = {
  createdAt: Date;
  feeling?: Feeling;
  image?: string;
  isPostModal?: boolean;
  location?: string;
  name: string;
  postId: string;
  postSaves: SavedPost[];
  postUserId: string;
};

export const PostHeader = ({
  createdAt,
  feeling,
  image,
  isPostModal = false,
  location,
  name,
  postId,
  postSaves,
  postUserId,
}: PostHeaderProps) => {
  return (
    <div className="flex items-start justify-between space-x-2 p-3 pr-1.5 md:relative md:items-center md:px-4 md:pr-3">
      <div className="flex w-full">
        <div className={classNames('mr-2', { 'hidden md:block': isPostModal })}>
          <ProfilePic image={image} name={name} />
        </div>
        <div>
          <PostUserInfo
            feeling={feeling}
            hideFellingInfo
            location={location}
            name={name}
          />
          <Timestamp date={createdAt} />
        </div>
      </div>
      {!isPostModal && (
        <PostOptions
          postId={postId}
          postSaves={postSaves}
          postUserId={postUserId}
        />
      )}
    </div>
  );
};
