'use client';

import {
  FriendsIcon,
  GroupsIcon,
  HomeIcon,
  MarketplaceIcon,
  WatchIcon,
} from '@/assets/ui/icons/navbar/links';

import { NavbarLink } from './link/NavbarLink';

export const NavbarLinks = () => {
  return (
    <>
      <NavbarLink Icon={HomeIcon} href="/" label="home" />
      <NavbarLink Icon={FriendsIcon} href="friends" label="friends" />
      <NavbarLink Icon={WatchIcon} href="watch" label="watch" />
      <NavbarLink
        Icon={MarketplaceIcon}
        href="marketplace"
        label="marketplace"
      />
      <NavbarLink Icon={GroupsIcon} href="groups" label="groups" />
    </>
  );
};
