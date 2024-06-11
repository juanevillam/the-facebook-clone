'use client';

import { Backdrop, Fade, Modal } from '@mui/material';
import { useTranslations } from 'next-intl';

import { CloseIcon } from '@/assets/ui/svgs';
import { IconButton } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleSignUpOpenable } from '@/lib/store/reducers/auth-reducer';

import { SignUpModalForm } from './form/sign-up-modal-form';

export const SignUpModal = () => {
  const t = useTranslations('auth.sign-up.modal');

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
        <div className="absolute bg-white left-1/2 max-w-md outline-none pb-4 pt-2 px-3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl w-full">
          <div className="border-b flex justify-between mb-4 pb-3">
            <div>
              <h1 className="font-semibold text-3xl" id="sign-up-modal-title">
                {t('title')}
              </h1>
              <p className="ml-1 text-gray-600" id="sign-up-modal-description">
                {t('subtitle')}
              </p>
            </div>
            <IconButton
              className="-mr-1 size-9 rounded-full"
              icon={{
                className: 'size-full stroke-2 text-gray-500',
                Component: CloseIcon,
                name: 'close',
              }}
              onClick={handleToggleSignUpOpenable}
            />
          </div>
          <SignUpModalForm />
        </div>
      </Fade>
    </Modal>
  );
};
