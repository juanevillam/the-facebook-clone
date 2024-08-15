import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { NavbarIconProps } from '@/assets/ui/icons/navbar/types';
import { Tooltip } from '@/components';
import { usePathname } from '@/navigation';

type NavbarLinkProps = {
  Icon: React.FC<NavbarIconProps>;
  href: '/' | 'friends' | 'groups' | 'marketplace' | 'watch';
  label: 'friends' | 'groups' | 'home' | 'marketplace' | 'watch';
};

export const NavbarLink = ({ Icon, href, label }: NavbarLinkProps) => {
  const t = useTranslations('navbar.links');
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname === `/${href}`;

  return (
    <Tooltip label={t(label)} position="-bottom-10">
      <Link
        aria-label={label}
        className={`flex-center-justify-center primary-transition peer h-14 md:h-12 md:w-max md:rounded-lg md:px-8 lg:px-10 xl:px-12 ${
          isActive ? 'relative' : 'hover:primary-bg'
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
          <div className="absolute -bottom-0.5 z-10 h-[3px] w-full rounded-sm bg-primary-100 md:-bottom-1" />
        )}
      </Link>
    </Tooltip>
  );
};
