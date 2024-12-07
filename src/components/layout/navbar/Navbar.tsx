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
        'responsive-desktop-block': isPostPage || isStoryPage,
      })}
    >
      <header
        className={classNames(
          'bg-card border-primary transform transition-transform duration-300 ease-in-out md:transform-none md:border-b',
          {
            '-translate-y-full': showTopHeader,
            'translate-y-0': !showTopHeader,
          }
        )}
      >
        <nav
          aria-label={t('navbar.main-navigation')}
          className="flex-between px-3 py-2 transition-colors duration-300 md:px-4 md:py-1"
        >
          <div className="flex-align-center">
            <Link aria-label={t('links.navigate-to-home-page')} href="/">
              <FacebookLogoMark className="hidden size-10 md:block" />
              <FacebookLogoType className="h-6 fill-primary-100 md:hidden dark:fill-white" />
            </Link>
          </div>
          <div className="mt-px hidden items-center space-x-2 md:flex">
            <NavbarLinks />
          </div>
          <div className="flex-align-center space-x-2">
            <NavbarDropDowns />
          </div>
        </nav>
      </header>
      <nav
        aria-label={t('navbar.mobile-navigation')}
        className={classNames(
          'bg-card border-primary flex-align-center transform border-b transition-transform duration-300 ease-in-out md:hidden',
          {
            '-translate-y-full': showTopHeader,
            'translate-y-0': !showTopHeader,
          }
        )}
      >
        <NavbarLinks />
      </nav>
    </div>
  );
};
