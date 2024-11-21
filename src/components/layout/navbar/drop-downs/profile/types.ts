import { SetValue } from '@/assets/types';

type ProfileDropDownProps = {
  setOpenProfileDropDown?: SetValue<boolean>;
  variant?: 'dropdown' | 'page';
};

type ProfileDropDownStep = 'default' | 'settings' | 'display-accessibility';

export type { ProfileDropDownProps, ProfileDropDownStep };
