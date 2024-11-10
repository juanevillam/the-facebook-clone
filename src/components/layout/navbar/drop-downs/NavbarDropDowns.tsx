import { useState } from 'react';

import {
  MessengerIcon,
  NotificationsIcon,
} from '@/assets/ui/icons/navbar/drop-downs';
import { ProfilePic } from '@/components/profile-pic/ProfilePic';
import { NavbarDropDownIcon } from './icons';
import { MessengerDropDown } from './messenger/MessengerDropDown';

export const NavbarDropDowns = () => {
  const [openMessengerDropDown, setOpenMessengerDropDown] = useState(false);

  const handleMessengerDropDown = () =>
    setOpenMessengerDropDown(!openMessengerDropDown);

  return (
    <div className="flex-center space-x-2">
      <NavbarDropDownIcon
        Icon={MessengerIcon}
        isActive={openMessengerDropDown}
        label="messenger"
        onClick={handleMessengerDropDown}
      />
      <div className="hidden md:flex md:space-x-2">
        <NavbarDropDownIcon Icon={NotificationsIcon} label="notifications" />
        <ProfilePic />
      </div>
      {openMessengerDropDown && <MessengerDropDown />}
    </div>
  );
};
