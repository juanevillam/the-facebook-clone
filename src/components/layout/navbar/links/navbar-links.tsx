'use client';

import {
  FriendsIcon,
  GroupsIcon,
  HomeIcon,
  MarketplaceIcon,
  WatchIcon,
} from '@/assets/ui/icons/navbar/links';

import { NavbarLink } from './link/navbar-link';

export const NavbarLinks = () => {
  return (
    <>
      <NavbarLink Icon={HomeIcon} label="home" />
      <NavbarLink Icon={FriendsIcon} label="friends" />
      <NavbarLink Icon={WatchIcon} label="watch" />
      <NavbarLink Icon={MarketplaceIcon} label="marketplace" />
      <NavbarLink Icon={GroupsIcon} label="groups" />
    </>
  );
};
