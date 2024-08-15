'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { ArrowLeftIcon } from '@/assets/ui/icons';
import { Button, IconButton } from '@/components/buttons';
import { MobileDialog } from '@/components/mobile';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleSignUpOpenable } from '@/lib/store/reducers/authReducer';

import { SignUpDialogForm } from './form/SignUpDialogForm';

export const SignUpDialog = () => {
  const [step, setStep] = useState(0);
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { signUpOpenableOpen } = useAppSelector((store) => store.authReducer);

  const closeStep = () =>
    step === 0 ? dispatch(toggleSignUpOpenable()) : setStep(step - 1);

  const nextStep = () =>
    step === 4 ? dispatch(toggleSignUpOpenable()) : setStep(step + 1);

  return (
    <MobileDialog open={signUpOpenableOpen} translateFrom="x">
      <div className="bg-white relative size-full">
        <div className="border-b border-gray-300 flex-center p-1.5 space-x-1.5">
          <IconButton
            className="size-10 hover:secondary-bg-light"
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
        <div className="mt-44 mx-auto space-y-6 w-11/12">
          <div className="space-y-3 text-center">
            <h1 className="font-semibold text-2xl">
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
