import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import {
  CreateStoryPageBody,
  CreateStoryPageHeader,
  CreateStoryPageSidebar,
} from '@/modules/stories/create/components/page';

const CreateStoryPage = ({ params: { locale } }: PageProps) => {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={pick(
        messages,
        'stories.create.page',
        'images',
        'toast-messages',
        'icon-buttons',
        'action-loader',
        'video-player'
      )}
    >
      <div className="card-bg primary-transition flex h-screen flex-col md:h-[calc(100vh-57px)] md:flex-row md:bg-transparent">
        <CreateStoryPageSidebar />
        <CreateStoryPageHeader />
        <CreateStoryPageBody />
      </div>
    </NextIntlClientProvider>
  );
};

export default CreateStoryPage;
