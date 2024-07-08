import { ProfilePic } from '@/components';
import { PostUserInfo } from '@/modules/posts/components';
import { Feeling } from '@/modules/posts/create/assets/types';

import { PostHeaderTimestamp } from './timestamp/PostHeaderTimestamp';
import { PostOptions } from '../options/PostOptions';

interface PostHeaderProps {
  createdAt: Date;
  feeling?: Feeling;
  image?: string;
  location?: string;
  name: string;
  postId: string;
  postUserId: string;
}

export const PostHeader = ({
  createdAt,
  feeling,
  image,
  location,
  name,
  postId,
  postUserId,
}: PostHeaderProps) => {
  return (
    <div className="flex items-start justify-between p-3 pr-1.5 md:pr-3 space-x-2 md:items-center md:px-4 md:relative">
      <div className="flex space-x-2 w-full">
        <ProfilePic image={image} name={name} />
        <div className="flex flex-col">
          <PostUserInfo
            feeling={feeling}
            hideFellingInfo
            location={location}
            name={name}
          />
          <PostHeaderTimestamp date={createdAt} />
        </div>
      </div>
      <PostOptions postId={postId} postUserId={postUserId} />
    </div>
  );
};
