'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { SearchIcon } from '@/assets/ui/icons';
import { FacebookLogoMark, FacebookLogoType } from '@/assets/ui/icons/brand';
import { useScrollDirection } from '@/hooks';

import { NavbarDropDowns } from './drop-downs/drop-downs';
import { NavbarLinks } from './links/navbar-links';

export const Navbar = () => {
  const t = useTranslations('navbar');

  const scrollDirection = useScrollDirection();

  return (
    <>
      <header
        className={`bg-white duration-150 sticky top-0 transform transition-transform z-40 md:transform-none md:dark:border-b dark:bg-dark-100 dark:border-dark-50 ${
          scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <nav
          aria-label={t('main-navigation')}
          className="h-14 flex justify-between px-3 md:px-4"
        >
          <div className="flex flex-none items-center">
            <Link aria-label={t('home')} href="/">
              <FacebookLogoMark className="size-10 hidden md:block" />
              <FacebookLogoType className="fill-primary-100 h-6 md:hidden dark:fill-white" />
            </Link>
            <div className="bg-gray-100 duration-150 hidden h-10 items-center ml-2 p-3 rounded-full transition w-max md:flex xl:w-60 dark:bg-dark-200">
              <SearchIcon className="fill-gray-500 size-4 dark:fill-gray-400" />
              <label className="sr-only" htmlFor="search">
                {t('search')}
              </label>
              <input
                aria-label={t('search')}
                className="bg-transparent duration-150 font-light flex-shrink placeholder-gray-500 text-gray-500 hidden ml-2 outline-none transition xl:inline-flex dark:text-gray-400 dark:placeholder-dark-300"
                id="search"
                placeholder={t('search')}
                type="text"
              />
            </div>
          </div>
          <div className="hidden items-center mt-px space-x-2 md:flex">
            <NavbarLinks />
          </div>
          <div className="flex items-center space-x-2" />
          <NavbarDropDowns />
        </nav>
      </header>
      <nav
        aria-label={t('mobile-navigation')}
        className={`bg-white border-b dark:bg-dark-100 duration-150 flex sticky top-14 transform transition-transform z-40 md:hidden dark:border-dark-50 ${
          scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <NavbarLinks />
      </nav>
    </>
  );
};
