import { SearchIcon } from '@/assets/ui/icons';
import {
  MenuIcon,
  MessengerIcon,
  NotificationsIcon,
} from '@/assets/ui/icons/navbar/drop-downs';
import { ProfilePic } from '@/components/profile-pic/ProfilePic';

import { NavbarDropDown } from './drop-down/NavbarDropDown';

export const NavbarDropDowns = () => {
  return (
    <div className="flex-center space-x-2">
      <NavbarDropDown
        className="hidden md:block"
        Icon={MenuIcon}
        isActive
        label="menu"
      />
      <div className="block md:hidden">
        <NavbarDropDown Icon={SearchIcon} label="search" />
      </div>
      <NavbarDropDown Icon={MessengerIcon} label="messenger" />
      <div className="hidden md:flex md:space-x-2">
        <NavbarDropDown Icon={NotificationsIcon} label="notifications" />
        <ProfilePic />
      </div>
    </div>
  );
};
