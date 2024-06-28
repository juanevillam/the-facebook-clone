import { pick } from 'lodash';
import Image from 'next/image';
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from 'next-intl';

import { ProfilePic } from '@/components';
import { POSTS_CREATE_LAYOUT_HEADER_PATH } from '@/modules/posts/create/assets/translations';
import { Feeling } from '@/modules/posts/create/assets/types';

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
  const tUserInfo = useTranslations(
    `${POSTS_CREATE_LAYOUT_HEADER_PATH}.user-info`
  );

  const tFeelings = useTranslations('posts.create.steps.feelings.list');

  return (
    <div className="flex items-start space-x-2">
      <ProfilePic alt={tUserInfo('profile-pic-alt', { name })} image={image} />
      <div className="flex flex-col">
        <span className="font-medium leading-tight mb-px text-dark-1100 dark:text-smoke-100">
          {name}
          {feeling && (
            <>
              <span className="font-normal text-gray-600 dark:text-smoke-200 md:text-gray-500">
                &nbsp;{tUserInfo('is')}
              </span>
              <Image
                alt={tUserInfo('feeling-icon-alt', { feeling })}
                className="inline-block mx-1"
                height={18}
                loading="eager"
                src={`/images/feelings/${feeling}-icon.png`}
                width={18}
              />
              <span className="hidden md:inline-block">
                {tUserInfo('feeling')}&nbsp;
              </span>
              <span className="font-normal text-gray-600 dark:text-smoke-200 md:text-gray-500">
                {tFeelings(feeling)}
              </span>
            </>
          )}
          {location && (
            <>
              {!feeling && (
                <span className="font-normal text-gray-600 dark:text-smoke-200 md:text-gray-500">
                  &nbsp;{tUserInfo('is')}
                </span>
              )}
              <span className="font-normal text-gray-600 dark:text-smoke-200 md:text-gray-500">
                &nbsp;{tUserInfo('in')}
              </span>
              <span className="font-medium text-dark-1100 dark:text-smoke-100">
                &nbsp;{location}
              </span>
            </>
          )}
        </span>
        <NextIntlClientProvider
          messages={pick(messages, 'posts.create.layout.header.user-info')}
        >
          <PostHeaderUserInfoTimestamp date={createdAt} />
        </NextIntlClientProvider>
      </div>
    </div>
  );
};
