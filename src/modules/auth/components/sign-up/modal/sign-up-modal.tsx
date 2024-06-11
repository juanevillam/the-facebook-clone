'use client';

import { Backdrop, Fade, Modal } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleSignUpOpenable } from '@/lib/store/reducers/auth-reducer';

export const SignUpModal = () => {
  const dispatch = useAppDispatch();
  const { signUpOpenableOpen } = useAppSelector((store) => store.authReducer);

  const handleToggleSignUpOpenable = () => dispatch(toggleSignUpOpenable());

  return (
    <Modal
      aria-labelledby="sign-up-modal-title"
      aria-describedby="sign-up-modal-description"
      className="hidden md:flex"
      closeAfterTransition
      onClose={handleToggleSignUpOpenable}
      open={signUpOpenableOpen}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={signUpOpenableOpen}>
        <div className="absolute bg-white left-1/2 max-w-md top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl w-full">
          SignUpModal
        </div>
      </Fade>
    </Modal>
  );
};
