'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { ArrowLeftIcon } from '@/assets/ui/icons';
import { Button, IconButton } from '@/components/buttons';
import { MobileDialog } from '@/components/mobile';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleSignUpOpenable } from '@/modules/auth/reducers/authReducer';

import { SignUpDialogForm } from './form/SignUpDialogForm';

export const SignUpDialog = () => {
  const [step, setStep] = useState(0);
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { signUpOpenableOpen } = useAppSelector((store) => store.auth);

  const closeStep = () =>
    step === 0 ? dispatch(toggleSignUpOpenable()) : setStep(step - 1);

  const nextStep = () =>
    step === 4 ? dispatch(toggleSignUpOpenable()) : setStep(step + 1);

  return (
    <MobileDialog open={signUpOpenableOpen} translateFrom="x">
      <div className="relative size-full bg-white">
        <div className="flex-center space-x-1.5 border-b border-gray-300 p-1.5">
          <IconButton
            className="hover:secondary-bg-light size-10"
            icon={{
              className: 'stroke-[2.5] primary-stroke-light size-full',
              Component: ArrowLeftIcon,
              name: 'back',
            }}
            onClick={closeStep}
          />
          <h1 className="primary-text-light text-lg">
            {t(`auth.sign-up.dialog.${step}-step.description`)}
          </h1>
        </div>
        <div className="mx-auto mt-44 w-11/12 space-y-6">
          <div className="space-y-3 text-center">
            <h1 className="text-2xl font-semibold">
              {t(`auth.sign-up.dialog.${step}-step.title`)}
            </h1>
            <p className="text-gray-600">
              {t(`auth.sign-up.dialog.${step}-step.subtitle`)}
            </p>
          </div>
          {step === 0 ? (
            <Button
              fullWidth
              label={t('auth.sign-up.dialog.next')}
              onClick={nextStep}
              size="sm"
              type="button"
              variant="primary"
            />
          ) : (
            <SignUpDialogForm nextStep={nextStep} step={step} />
          )}
        </div>
      </div>
    </MobileDialog>
  );
};
