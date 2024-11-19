'use client';

import {
  FriendsIcon,
  HomeIcon,
  MenuIcon,
  WatchIcon,
} from '@/assets/ui/icons/navbar/links';

import { NavbarLink } from './link/NavbarLink';

export const NavbarLinks = () => {
  return (
    <>
      <NavbarLink Icon={HomeIcon} href="/" label="home" />
      <NavbarLink Icon={FriendsIcon} href="friends" label="friends" />
      <NavbarLink Icon={WatchIcon} href="watch" label="watch" />
      <NavbarLink Icon={MenuIcon} href="menu" label="menu" onlyMobile />
    </>
  );
};
