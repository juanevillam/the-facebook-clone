import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { PostExtended } from '@/modules/posts/post/assets/types';

import { PostModal } from '../PostModal';

type PostModalWrapperProps = {
  post: PostExtended;
};

export const PostModalWrapper = ({ post }: PostModalWrapperProps) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={pick(
        messages,
        'posts',
        'images',
        'toast-messages',
        'icon-buttons',
        'action-loader',
        'timestamp',
        'video-player'
      )}
    >
      <PostModal post={post} />
    </NextIntlClientProvider>
  );
};
