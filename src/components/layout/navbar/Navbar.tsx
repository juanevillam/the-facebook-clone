'use client';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { FacebookLogoMark, FacebookLogoType } from '@/assets/ui/icons/brand';
import { useScrollDirection } from '@/hooks';
import { Link, usePathname } from '@/navigation';

import { NavbarDropDowns } from './drop-downs/NavbarDropDowns';
import { NavbarLinks } from './links/NavbarLinks';

export const Navbar = () => {
  const t = useTranslations('navbar');
  const scrollDirection = useScrollDirection();
  const pathname = usePathname();

  const isPostPage = pathname.includes('posts');
  const showTopHeader =
    !isPostPage &&
    ((scrollDirection === 'down' && pathname === '/') || pathname !== '/');

  return (
    <div
      className={classNames('sticky top-0 z-30', {
        'hidden md:block': isPostPage,
      })}
    >
      <header
        className={`card-bg primary-border primary-transition sticky top-0 z-30 transform transition-transform md:transform-none md:border-b ${
          showTopHeader ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <nav
          aria-label={t('main-navigation')}
          className="flex-center-justify-between h-14 px-3 md:px-4"
        >
          <div className="flex-center">
            <Link aria-label={t('home')} href="/">
              <FacebookLogoMark className="hidden size-10 md:block" />
              <FacebookLogoType className="h-6 fill-primary-100 dark:fill-white md:hidden" />
            </Link>
          </div>
          <div className="mt-px hidden items-center space-x-2 md:flex">
            <NavbarLinks />
          </div>
          <div className="flex-center space-x-2">
            <NavbarDropDowns />
          </div>
        </nav>
      </header>
      <nav
        aria-label={t('mobile-navigation')}
        className={`card-bg primary-border sticky top-14 z-30 flex transform border-b transition-transform md:hidden ${
          showTopHeader ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <NavbarLinks />
      </nav>
    </div>
  );
};
