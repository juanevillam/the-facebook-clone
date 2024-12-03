'use client';

import {
  FriendsIcon,
  HomeIcon,
  MenuIcon,
  WatchIcon,
} from '@/assets/icons/navbar/links';

import { NavbarLink } from './NavbarLink';

export const NavbarLinks = () => (
  <>
    <NavbarLink Icon={HomeIcon} href="/" label="home" />
    <NavbarLink Icon={FriendsIcon} href="friends" label="friends" />
    <NavbarLink Icon={WatchIcon} href="watch" label="watch" />
    <NavbarLink Icon={MenuIcon} href="menu" label="menu" onlyMobile />
  </>
);
