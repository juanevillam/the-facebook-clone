import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { NavbarIconProps } from '@/assets/icons/navbar/types';
import { Tooltip } from '@/components';
import { Link, usePathname } from '@/navigation';

type NavbarLinkProps = {
  Icon: React.FC<NavbarIconProps>;
  href: '/' | 'friends' | 'menu' | 'watch';
  label: 'friends' | 'home' | 'menu' | 'watch';
  onlyMobile?: boolean;
};

export const NavbarLink = ({
  Icon,
  href,
  label,
  onlyMobile = false,
}: NavbarLinkProps) => {
  const t = useTranslations('navbar.links');
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname === `/${href}`;

  return (
    <Tooltip label={t(label)} position="-bottom-10">
      <Link
        aria-label={t(label)}
        className={classNames(
          'flex-center-justify-center primary-transition peer h-14 md:h-12 md:w-max md:rounded-lg md:px-8 lg:px-10 xl:px-12',
          {
            relative: isActive,
            'hover:primary-bg': !isActive,
            'md:hidden': onlyMobile,
          }
        )}
        href={`/${href}` as any}
        tabIndex={0}
      >
        <Icon
          className={classNames({
            'size-[30px]': label === 'menu',
            'size-6': label !== 'menu',
            'fill-current text-primary-100': isActive,
            'stroke-gray-600 dark:stroke-gray-400':
              !isActive && label === 'menu',
            'fill-gray-600 dark:fill-gray-400': !isActive && label !== 'menu',
          })}
          isActive={isActive}
        />
        {isActive && (
          <div className="absolute -bottom-0.5 z-10 h-[3px] w-full rounded-sm bg-primary-100 md:-bottom-1" />
        )}
      </Link>
    </Tooltip>
  );
};
