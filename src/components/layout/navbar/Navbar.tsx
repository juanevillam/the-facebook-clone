'use client';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { FacebookLogoMark, FacebookLogoType } from '@/assets/icons/brand';
import { useScrollDirection } from '@/hooks';
import { Link, usePathname } from '@/navigation';

import { NavbarDropDowns } from './drop-downs/NavbarDropDowns';
import { NavbarLinks } from './links/NavbarLinks';

export const Navbar = () => {
  const t = useTranslations();
  const scrollDirection = useScrollDirection();
  const pathname = usePathname();

  const isPostPage = pathname === '/posts/[id]';
  const isStoryPage = pathname === '/stories/[id]';

  const shouldShowTopHeader = () =>
    !isPostPage &&
    ((scrollDirection === 'down' && pathname === '/') || pathname !== '/');

  const showTopHeader = shouldShowTopHeader();

  return (
    <div
      className={classNames('sticky top-0 z-30', {
        'only-desktop-block': isPostPage || isStoryPage,
      })}
    >
      <header
        className={`card-bg primary-border primary-transition transform transition-transform md:transform-none md:border-b ${
          showTopHeader ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <nav
          aria-label={t('navbar.main-navigation')}
          className="flex-center-justify-between px-3 py-2 md:px-4 md:py-1"
        >
          <div className="flex-center">
            <Link aria-label={t('logos.link-aria-label')} href="/">
              <FacebookLogoMark className="hidden size-10 md:block" />
              <FacebookLogoType className="h-6 fill-primary-100 md:hidden dark:fill-white" />
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
        aria-label={t('navbar.mobile-navigation')}
        className={`card-bg primary-border flex-center transform border-b transition-transform md:hidden ${
          showTopHeader ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <NavbarLinks />
      </nav>
    </div>
  );
};
