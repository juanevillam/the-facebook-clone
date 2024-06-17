'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { SearchIcon } from '@/assets/ui/svgs';
import { FacebookLogoMark, FacebookLogoType } from '@/assets/ui/svgs/brand';

export const Navbar = () => {
  const t = useTranslations('navbar');

  return (
    <header
      className={`bg-white duration-150 sticky top-0 z-10 md:dark:border-b dark:bg-dark-100 dark:border-dark-50`}
    >
      <nav
        aria-label={t('main-navigation')}
        className="h-14 flex justify-between px-3 md:px-4"
      >
        <div className="flex flex-none items-center">
          <Link aria-label={t('home')} href="/home">
            <FacebookLogoMark className="size-10 hidden md:block" />
            <FacebookLogoType className="fill-primary-100 h-6 md:hidden dark:fill-white" />
          </Link>
          <div className="bg-smoke-100 duration-150 hidden md:flex items-center h-10 ml-2 p-3 rounded-full transition w-max xl:w-60 dark:bg-dark-200">
            <SearchIcon className="fill-smoke-200 size-4 dark:fill-smoke-300" />
            <label className="sr-only" htmlFor="search">
              {t('search')}
            </label>
            <input
              aria-label={t('search')}
              id="search"
              type="text"
              placeholder={t('search')}
              className="bg-transparent duration-150 font-light flex-shrink placeholder-smoke-200 text-smoke-200 hidden ml-2 outline-none transition xl:inline-flex dark:text-smoke-300 dark:placeholder-dark-300"
            />
          </div>
        </div>
        <div className="hidden items-center mt-px space-x-2 md:flex"></div>
      </nav>
    </header>
  );
};
