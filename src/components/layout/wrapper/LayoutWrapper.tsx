import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Navbar } from '../navbar/Navbar';

export const LayoutWrapper = ({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) => {
  const messages = useMessages();

  return (
    <div
      className="bg-gray-100 dark:bg-neutral-900 primary-transition h-full min-h-screen"
      id="facebook-clone"
    >
      <div className="max-w-screen-2xl mx-auto">
        <NextIntlClientProvider
          locale={locale}
          messages={pick(messages, 'navbar', 'images')}
        >
          <Navbar />
        </NextIntlClientProvider>
        {children}
      </div>
    </div>
  );
};
