import { SearchIcon } from '@/assets/ui/icons';
import {
  MenuIcon,
  MessengerIcon,
  NotificationsIcon,
} from '@/assets/ui/icons/navbar/drop-downs';
import { NoProfilePicImage } from '@/components/images';

import { DropDown } from './drop-down/drop-down';

export const NavbarDropDowns = () => {
  return (
    <div className="flex items-center space-x-2">
      <DropDown
        className="hidden md:block"
        Icon={MenuIcon}
        isActive
        label="menu"
      />
      <div className="block md:hidden">
        <DropDown Icon={SearchIcon} label="search" />
      </div>
      <DropDown Icon={MessengerIcon} label="messenger" />
      <div className="hidden md:flex md:space-x-2">
        <DropDown Icon={NotificationsIcon} label="notifications" />
        <NoProfilePicImage />
      </div>
    </div>
  );
};
