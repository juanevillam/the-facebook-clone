import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { PostExtended } from '@/modules/posts/post/assets/types';

import { PostPage } from '../PostPage';

type PostPageWrapperProps = {
  post: PostExtended;
};

export const PostPageWrapper = ({ post }: PostPageWrapperProps) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={pick(
        messages,
        'posts',
        'images',
        'toast-messages',
        'action-loader',
        'timestamp'
      )}
    >
      <PostPage post={post} />
    </NextIntlClientProvider>
  );
};
