'use client';

import { useCallback, useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

import { AlertTriangleImage } from '@/components/images';

import { verifyEmail } from '../../services/emailVerificationService';
import { AuthCard } from '../ui';

export const VerifyEmailForm = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const t = useTranslations();

  const handleSubmit = useCallback(() => {
    if (!token) {
      setStatus('error');
      showToast.error(t('toast-messages.error.missing-token'), {
        id: 'missing-token',
      });

      return;
    }

    verifyEmail(token)
      .then((data) => {
        if (data.type === 'success') {
          setStatus('success');
          showToast.success(t(`toast-messages.success.${data.message}`), {
            id: data.message,
          });
        } else {
          setStatus('error');
          showToast.error(t(`toast-messages.error.${data.message}`), {
            id: data.message,
          });
        }
      })
      .catch(() => {
        setStatus('error');
        showToast.error(t('toast-messages.error.something-went-wrong'), {
          id: 'something-went-wrong',
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <AuthCard
      info={{
        title: t(`auth.verify-email.${status}.title`),
        description: t(`auth.verify-email.${status}.description`),
      }}
      showChildrenOn="top"
    >
      {status === 'loading' && (
        <div className="flex py-1.5">
          <BeatLoader color="#2C64F6" size={16} />
        </div>
      )}
      {status === 'error' && <AlertTriangleImage size={32} />}
    </AuthCard>
  );
};
