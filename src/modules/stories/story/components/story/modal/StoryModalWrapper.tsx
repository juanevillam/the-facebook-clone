import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { StoryExtended } from '@/modules/posts/post/types';

import { StoryModal } from './StoryModal';

type StoryModalWrapperProps = {
  story: StoryExtended;
};

export const StoryModalWrapper = ({ story }: StoryModalWrapperProps) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={pick(
        messages,
        'stories.story-player',
        'images',
        'toast-messages',
        'icon-buttons',
        'action-loader',
        'timestamp',
        'logos',
        'links'
      )}
    >
      <StoryModal story={story} />
    </NextIntlClientProvider>
  );
};
