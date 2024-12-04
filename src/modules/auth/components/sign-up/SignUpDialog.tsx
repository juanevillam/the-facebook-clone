'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { ArrowLeftIcon } from '@/assets/icons';
import { MobileDialog } from '@/components';
import { Button, IconButton } from '@/components/buttons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleSignUpOpenable } from '@/modules/auth/reducers/authReducer';

import { SignUpDialogForm } from './SignUpDialogForm';

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
    <MobileDialog
      open={signUpOpenableOpen}
      titleId="sign-up-dialog-title"
      translateFrom="x"
    >
      <div className="relative size-full bg-white">
        <header className="flex-center space-x-1.5 border-b border-gray-300 p-1.5">
          <IconButton
            className="hover:secondary-bg-light size-10"
            icon={{
              ariaLabel: 'back-to-login',
              className: 'stroke-[2.5] primary-stroke-light size-full',
              Component: ArrowLeftIcon,
            }}
            onClick={closeStep}
          />
          <h1
            className="primary-text-light text-lg"
            id="sign-up-dialog-title"
            aria-live="polite"
          >
            {t(`auth.sign-up.dialog.${step}-step.description`)}
          </h1>
        </header>
        <main className="mx-auto mt-44 w-11/12 space-y-6">
          <section className="space-y-3 text-center">
            <h2 className="text-2xl font-semibold">
              {t(`auth.sign-up.dialog.${step}-step.title`)}
            </h2>
            <p className="text-gray-600">
              {t(`auth.sign-up.dialog.${step}-step.subtitle`)}
            </p>
          </section>
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
        </main>
      </div>
    </MobileDialog>
  );
};
