'use client';

import { Button, MobileDialog } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleSignUpOpenable } from '@/lib/store/reducers/auth-reducer';

export const SignUpDialog = () => {
  const dispatch = useAppDispatch();
  const { signUpOpenableOpen } = useAppSelector((store) => store.authReducer);

  const handleToggleSignUpOpenable = () => dispatch(toggleSignUpOpenable());

  return (
    <MobileDialog open={signUpOpenableOpen} translateFrom="x">
      <div className="bg-white h-full relative w-full">
        SignUpModalDialog
        <Button
          label="Close"
          onClick={handleToggleSignUpOpenable}
          type="button"
          size="md"
          variant="secondary"
        />
      </div>
    </MobileDialog>
  );
};
