import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { StoryExtended } from '@/modules/posts/post/assets/types';

import { StoryPage } from '../StoryPage';

type StoryPageWrapperProps = {
  story: StoryExtended;
};

export const StoryPageWrapper = ({ story }: StoryPageWrapperProps) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={pick(
        messages,
        'images',
        'toast-messages',
        'icon-buttons',
        'action-loader',
        'timestamp'
      )}
    >
      <StoryPage story={story} />
    </NextIntlClientProvider>
  );
};
