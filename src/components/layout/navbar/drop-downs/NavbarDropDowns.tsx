import { useEffect, useRef, useState } from 'react';

import {
  MessengerIcon,
  NotificationsIcon,
} from '@/assets/ui/icons/navbar/drop-downs';
import { ProfilePic } from '@/components/ProfilePic';
import { usePathname, useRouter } from '@/navigation';

import { NavbarDropDownIcon } from './icons';
import { MessengerDropDown } from './MessengerDropDown';
import { NotificationsDropDown } from './NotificationsDropDown';
import { ProfileDropDown } from './profile/ProfileDropDown';

export const NavbarDropDowns = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openMessengerDropDown, setOpenMessengerDropDown] = useState(false);
  const [openNotificationsDropDown, setOpenNotificationsDropDown] =
    useState(false);

  const [openProfileDropDown, setOpenProfileDropDown] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const isOnMessengerPage = pathname === '/messenger';
  const isOnNotificationsPage = pathname === '/notifications';

  const handleMessengerDropDown = () => {
    setOpenNotificationsDropDown(false);
    setOpenProfileDropDown(false);
    setOpenMessengerDropDown(!openMessengerDropDown);
  };

  const handleNotificationsDropDown = () => {
    setOpenMessengerDropDown(false);
    setOpenProfileDropDown(false);
    setOpenNotificationsDropDown(!openNotificationsDropDown);
  };

  const handleProfileDropDown = () => {
    setOpenMessengerDropDown(false);
    setOpenNotificationsDropDown(false);
    setOpenProfileDropDown(!openProfileDropDown);
  };

  const navigateToMessenger = () => router.push('/messenger');

  const navigateToNotifications = () => router.push('/notifications');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenMessengerDropDown(false);
        setOpenNotificationsDropDown(false);
        setOpenProfileDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-center space-x-2" ref={dropdownRef}>
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
        <NavbarDropDownIcon
          isActive={openProfileDropDown}
          label="profile"
          onClick={handleProfileDropDown}
        >
          <ProfilePic />
        </NavbarDropDownIcon>
      </div>
      {openMessengerDropDown && (
        <MessengerDropDown
          setOpenMessengerDropDown={setOpenMessengerDropDown}
        />
      )}
      {openNotificationsDropDown && <NotificationsDropDown />}
      {openProfileDropDown && (
        <ProfileDropDown setOpenProfileDropDown={setOpenProfileDropDown} />
      )}
    </div>
  );
};
