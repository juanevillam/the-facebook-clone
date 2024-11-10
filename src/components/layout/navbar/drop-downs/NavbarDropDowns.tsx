import { useState } from 'react';

import {
  MessengerIcon,
  NotificationsIcon,
} from '@/assets/ui/icons/navbar/drop-downs';
import { ProfilePic } from '@/components/profile-pic/ProfilePic';
import { NavbarDropDownIcon } from './icons';
import { MessengerDropDown } from './messenger/MessengerDropDown';
import { NotificationsDropDown } from './notifications/NotificationsDropDown';

export const NavbarDropDowns = () => {
  const [openMessengerDropDown, setOpenMessengerDropDown] = useState(false);
  const [openNotificationsDropDown, setOpenNotificationsDropDown] =
    useState(false);

  const handleMessengerDropDown = () => {
    setOpenNotificationsDropDown(false);
    setOpenMessengerDropDown(!openMessengerDropDown);
  };

  const handleNotificationsDropDown = () => {
    setOpenMessengerDropDown(false);
    setOpenNotificationsDropDown(!openNotificationsDropDown);
  };

  return (
    <div className="flex-center space-x-2">
      <NavbarDropDownIcon
        Icon={MessengerIcon}
        isActive={openMessengerDropDown}
        label="messenger"
        onClick={handleMessengerDropDown}
      />
      <div className="hidden md:flex md:space-x-2">
        <NavbarDropDownIcon
          Icon={NotificationsIcon}
          isActive={openNotificationsDropDown}
          label="notifications"
          onClick={handleNotificationsDropDown}
        />
        <ProfilePic />
      </div>
      {openMessengerDropDown && <MessengerDropDown />}
      {openNotificationsDropDown && <NotificationsDropDown />}
    </div>
  );
};
