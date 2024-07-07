import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';

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
  userId: string;
}

export const PostHeader = ({
  createdAt,
  feeling,
  image,
  location,
  name,
  postId,
  userId,
}: PostHeaderProps) => {
  const messages = useMessages();

  return (
    <div className="flex items-start justify-between p-3 pb-2.5 mb:pb-3 md:pl-4 pr-0 md:pr-3 md:relative space-x-2 md:items-center">
      <div className="flex w-full space-x-2">
        <ProfilePic image={image} name={name} />
        <div className="flex flex-col">
          <PostUserInfo
            feeling={feeling}
            hideFellingInfo
            location={location}
            name={name}
          />
          <NextIntlClientProvider
            messages={pick(messages, 'posts.user-info.timestamp')}
          >
            <PostHeaderTimestamp date={createdAt} />
          </NextIntlClientProvider>
        </div>
      </div>
      <PostOptions postId={postId} userId={userId} />
    </div>
  );
};
