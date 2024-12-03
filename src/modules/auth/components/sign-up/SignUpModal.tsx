'use client';

import { Backdrop, Fade, Modal } from '@mui/material';
import { useTranslations } from 'next-intl';

import { CloseIcon } from '@/assets/icons';
import { IconButton } from '@/components/buttons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleSignUpOpenable } from '@/modules/auth/reducers/authReducer';

import { SignUpModalForm } from './SignUpModalForm';

export const SignUpModal = () => {
  const t = useTranslations('auth.sign-up.modal');
  const dispatch = useAppDispatch();
  const { signUpOpenableOpen } = useAppSelector((store) => store.auth);

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
        <div className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-white px-3 pb-4 pt-2 outline-none">
          <div className="primary-border-light-full mb-4 flex justify-between border-b pb-3">
            <div>
              <h1 className="text-3xl font-semibold" id="sign-up-modal-title">
                {t('title')}
              </h1>
              <p className="ml-1 text-gray-600" id="sign-up-modal-description">
                {t('subtitle')}
              </p>
            </div>
            <IconButton
              className="primary-bg-light hover:secondary-bg-light -mr-1 size-9"
              icon={{
                ariaLabel: 'back-to-login',
                className: 'stroke-2 secondary-stroke size-full',
                Component: CloseIcon,
              }}
              onClick={handleToggleSignUpOpenable}
            />
          </div>
          <SignUpModalForm
            handleToggleSignUpOpenable={handleToggleSignUpOpenable}
          />
        </div>
      </Fade>
    </Modal>
  );
};
