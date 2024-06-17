import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Navbar } from '../navbar/navbar';

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
      className="bg-smoke-100 duration-150 h-full min-h-screen transition dark:bg-dark-400"
      id="facebook-clone"
    >
      <div className="max-w-screen-2xl mx-auto">
        <NextIntlClientProvider
          locale={locale}
          messages={pick(messages, 'navbar')}
        >
          <Navbar />
        </NextIntlClientProvider>
        {children}
      </div>
    </div>
  );
};
