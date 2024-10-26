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
        className={`card-bg primary-border primary-transition sticky top-0 z-40 transform transition-transform md:transform-none md:border-b ${
          scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <nav
          aria-label={t('main-navigation')}
          className="flex h-14 justify-between px-3 md:px-4"
        >
          <div className="flex flex-none items-center">
            <Link aria-label={t('home')} href="/">
              <FacebookLogoMark className="hidden size-10 md:block" />
              <FacebookLogoType className="h-6 fill-primary-100 md:hidden dark:fill-white" />
            </Link>
            <div className="primary-bg primary-transition ml-2 hidden h-10 w-max items-center rounded-full p-3 md:flex xl:w-60">
              <SearchIcon className="secondary-fill size-4" />
              <label className="sr-only" htmlFor="search">
                {t('search')}
              </label>
              <input
                aria-label={t('search')}
                className="primary-placeholder primary-text primary-transition ml-2 hidden flex-shrink bg-transparent font-light focus:outline-none xl:inline-flex"
                id="search"
                placeholder={t('search')}
                type="text"
              />
            </div>
          </div>
          <div className="mt-px hidden items-center space-x-2 md:flex">
            <NavbarLinks />
          </div>
          <div className="flex-center space-x-2" />
          <NavbarDropDowns />
        </nav>
      </header>
      <nav
        aria-label={t('mobile-navigation')}
        className={`card-bg primary-border sticky top-14 z-40 flex transform border-b transition-transform md:hidden ${
          scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <NavbarLinks />
      </nav>
    </>
  );
};
