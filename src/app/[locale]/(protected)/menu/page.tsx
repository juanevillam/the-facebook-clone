import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { PageProps } from '@/assets/types';
import { MenuView } from '@/components';
import { NotAvailableForDesktop } from '@/components/feedback';

const MenuPage = ({ params: { locale } }: PageProps) => {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <>
      <div className="only-mobile mx-auto max-w-md">
        <NextIntlClientProvider
          locale={locale}
          messages={pick(messages, 'navbar', 'images', 'icon-buttons', 'menu')}
        >
          <MenuView />
        </NextIntlClientProvider>
      </div>
      <div className="only-desktop-block">
        <NotAvailableForDesktop />
      </div>
    </>
  );
};

export default MenuPage;
