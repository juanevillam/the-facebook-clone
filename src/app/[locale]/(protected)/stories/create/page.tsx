import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import {
  CreateStoryPageCards,
  CreateStoryPageHeader,
  CreateStoryPageSidebar,
} from '@/modules/stories/create/components/page';

const CreateStoryPage = ({ params: { locale } }: PageProps) => {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <div className="card-bg h-screen md:flex md:h-[calc(100vh-57px)] md:bg-transparent">
      <NextIntlClientProvider
        messages={pick(
          messages,
          'stories.create.page',
          'images',
          'icon-buttons'
        )}
      >
        <CreateStoryPageSidebar />
        <CreateStoryPageHeader />
        <CreateStoryPageCards />
      </NextIntlClientProvider>
    </div>
  );
};

export default CreateStoryPage;
