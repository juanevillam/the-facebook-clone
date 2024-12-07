import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Navbar } from './navbar/Navbar';

export const LayoutWrapper = ({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) => {
  const messages = useMessages();

  return (
    <main className="h-full min-h-screen bg-gray-100 transition-colors duration-300 ease-in-out dark:bg-neutral-900">
      <div className="mx-auto max-w-screen-2xl transition-all duration-300 ease-in-out">
        <NextIntlClientProvider
          locale={locale}
          messages={pick(
            messages,
            'navbar',
            'images',
            'icon-buttons',
            'search-input',
            'logos',
            'links'
          )}
        >
          <Navbar />
        </NextIntlClientProvider>
        {children}
      </div>
    </main>
  );
};
