import { useState } from 'react';

import {
  MessengerIcon,
  NotificationsIcon,
} from '@/assets/ui/icons/navbar/drop-downs';
import { ProfilePic } from '@/components/profile-pic/ProfilePic';
import { NavbarDropDownIcon } from './icons';
import { MessengerDropDown } from './messenger/MessengerDropDown';
import { NotificationsDropDown } from './notifications/NotificationsDropDown';
import { usePathname, useRouter } from '@/navigation';

export const NavbarDropDowns = () => {
  const [openMessengerDropDown, setOpenMessengerDropDown] = useState(false);
  const [openNotificationsDropDown, setOpenNotificationsDropDown] =
    useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isOnMessengerPage = pathname === '/messenger';
  const isOnNotificationsPage = pathname === '/notifications';

  const handleMessengerDropDown = () => {
    setOpenNotificationsDropDown(false);
    setOpenMessengerDropDown(!openMessengerDropDown);
  };

  const handleNotificationsDropDown = () => {
    setOpenMessengerDropDown(false);
    setOpenNotificationsDropDown(!openNotificationsDropDown);
  };

  const navigateToMessenger = () => router.push('/messenger');

  const navigateToNotifications = () => router.push('/notifications');

  return (
    <div className="flex-center space-x-2">
      <div className="only-mobile">
        <NavbarDropDownIcon
          Icon={MessengerIcon}
          isActive={isOnMessengerPage}
          label="messenger"
          onClick={navigateToMessenger}
        />
      </div>
      <div className="only-desktop">
        <NavbarDropDownIcon
          Icon={MessengerIcon}
          isActive={openMessengerDropDown}
          label="messenger"
          onClick={handleMessengerDropDown}
        />
      </div>
      <div className="only-mobile">
        <NavbarDropDownIcon
          Icon={NotificationsIcon}
          isActive={isOnNotificationsPage}
          label="notifications"
          onClick={navigateToNotifications}
        />
      </div>
      <div className="only-desktop">
        <NavbarDropDownIcon
          Icon={NotificationsIcon}
          isActive={openNotificationsDropDown}
          label="notifications"
          onClick={handleNotificationsDropDown}
        />
      </div>
      <div className="only-desktop">
        <ProfilePic />
      </div>
      {openMessengerDropDown && <MessengerDropDown />}
      {openNotificationsDropDown && <NotificationsDropDown />}
    </div>
  );
};
