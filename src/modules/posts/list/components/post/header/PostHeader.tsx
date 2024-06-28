import { Feeling } from '@/modules/posts/create/assets/types';

import { PostHeaderOptions } from './options/PostHeaderOptions';
import { PostHeaderUserInfo } from './user-info/PostHeaderUserInfo';

interface PostHeaderProps {
  createdAt: Date;
  feeling?: Feeling;
  image?: string;
  location?: string;
  name: string;
}

export const PostHeader = ({
  createdAt,
  feeling,
  image,
  location,
  name,
}: PostHeaderProps) => {
  return (
    <div className="flex items-start justify-between pb-3 pl-3 pr-1 space-x-2 md:items-center md:px-4">
      <PostHeaderUserInfo
        createdAt={createdAt}
        feeling={feeling as Feeling}
        image={image as string}
        location={location as string}
        name={name as string}
      />
      <PostHeaderOptions />
    </div>
  );
};
