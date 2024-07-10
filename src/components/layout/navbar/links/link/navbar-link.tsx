'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { NavbarIconProps } from '@/assets/ui/icons/navbar/types';
import { Tooltip } from '@/components';
import { usePathname } from '@/navigation';

interface NavbarLinkProps {
  Icon: React.FC<NavbarIconProps>;
  href: '/' | 'friends' | 'groups' | 'marketplace' | 'watch';
  label: 'friends' | 'groups' | 'home' | 'marketplace' | 'watch';
}

export const NavbarLink = ({ Icon, href, label }: NavbarLinkProps) => {
  const t = useTranslations('navbar.links');
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname === `/${href}`;

  return (
    <Tooltip label={t(label)} position="-bottom-10">
      <Link
        aria-label={label}
        className={`cursor-pointer duration-150 flex h-14 items-center justify-center peer transition md:h-12 md:px-8 md:rounded-lg md:w-max lg:px-10 xl:px-12 ${
          isActive ? 'relative' : 'hover:bg-gray-100 dark:hover:bg-dark-200'
        }`}
        href={`/${href}`}
        tabIndex={0}
      >
        <Icon
          className={`size-6 ${
            isActive
              ? 'fill-current text-primary-100'
              : 'fill-gray-600 dark:fill-gray-400'
          }`}
          isActive={isActive}
        />
        {isActive && (
          <div className="bg-primary-100 absolute -bottom-0.5 h-[3px] rounded-sm w-full z-10 md:-bottom-1" />
        )}
      </Link>
    </Tooltip>
  );
};
