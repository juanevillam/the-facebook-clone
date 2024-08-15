'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { SearchIcon } from '@/assets/ui/icons';
import { FacebookLogoMark, FacebookLogoType } from '@/assets/ui/icons/brand';
import { useScrollDirection } from '@/hooks';

import { NavbarDropDowns } from './drop-downs/NavbarDropDowns';
import { NavbarLinks } from './links/NavbarLinks';

export const Navbar = () => {
  const t = useTranslations('navbar');
  const scrollDirection = useScrollDirection();

  return (
    <>
      <header
        className={`card-bg md:border-b primary-border primary-transition sticky top-0 transform transition-transform md:transform-none z-40 ${
          scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <nav
          aria-label={t('main-navigation')}
          className="flex h-14 justify-between px-3 md:px-4"
        >
          <div className="flex flex-none items-center">
            <Link aria-label={t('home')} href="/">
              <FacebookLogoMark className="size-10 hidden md:block" />
              <FacebookLogoType className="fill-primary-100 dark:fill-white h-6 md:hidden" />
            </Link>
            <div className="primary-bg primary-transition hidden h-10 items-center ml-2 p-3 rounded-full w-max xl:w-60 md:flex">
              <SearchIcon className="secondary-fill size-4" />
              <label className="sr-only" htmlFor="search">
                {t('search')}
              </label>
              <input
                aria-label={t('search')}
                className="primary-placeholder primary-text primary-transition bg-transparent font-light flex-shrink hidden xl:inline-flex ml-2 focus:outline-none"
                id="search"
                placeholder={t('search')}
                type="text"
              />
            </div>
          </div>
          <div className="hidden md:flex items-center mt-px space-x-2">
            <NavbarLinks />
          </div>
          <div className="flex-center space-x-2" />
          <NavbarDropDowns />
        </nav>
      </header>
      <nav
        aria-label={t('mobile-navigation')}
        className={`flex md:hidden card-bg border-b primary-border sticky top-14 transform transition-transform z-40 ${
          scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <NavbarLinks />
      </nav>
    </>
  );
};
