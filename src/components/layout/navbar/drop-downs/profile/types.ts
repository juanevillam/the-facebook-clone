import { SetValue } from '@/assets/types';

type ProfileDropDownProps = {
  setOpenProfileDropDown: SetValue<boolean>;
};

type ProfileDropDownStep =
  | 'default'
  | 'settings-privacy'
  | 'display-accessibility';

export type { ProfileDropDownProps, ProfileDropDownStep };
