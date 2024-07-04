import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { ProfilePic } from '@/components';
import { PostUserInfo } from '@/modules/posts/components';
import { Feeling, Location } from '@/modules/posts/create/assets/types';

import { PostHeaderUserInfoTimestamp } from './timestamp/PostHeaderUserInfoTimestamp';

interface PostUserInfoProps {
  createdAt: Date;
  feeling?: Feeling;
  image: string;
  location?: string;
  name: string;
}

export const PostHeaderUserInfo = ({
  createdAt,
  feeling,
  image,
  location,
  name,
}: PostUserInfoProps) => {
  const messages = useMessages();

  return (
    <div className="flex space-x-2">
      <ProfilePic image={image} name={name} />
      <div className="flex flex-col">
        <PostUserInfo feeling={feeling} location={location} name={name} />
        <NextIntlClientProvider
          messages={pick(messages, 'posts.user-info.timestamp')}
        >
          <PostHeaderUserInfoTimestamp date={createdAt} />
        </NextIntlClientProvider>
      </div>
    </div>
  );
};
