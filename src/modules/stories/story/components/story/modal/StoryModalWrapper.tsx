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
        'images',
        'toast-messages',
        'icon-buttons',
        'action-loader',
        'timestamp',
        'logos'
      )}
    >
      <StoryModal story={story} />
    </NextIntlClientProvider>
  );
};
