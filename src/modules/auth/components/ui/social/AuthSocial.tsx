import { signIn } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import showToast from 'react-hot-toast';

import { GithubIcon, GoogleIcon } from '@/assets/ui/icons/social';

import { AuthSocialButton } from './button/AuthSocialButton';

type Provider = 'google' | 'github';

export const AuthSocial = () => {
  const locale = useLocale();
  const t = useTranslations();
  const isDevelopment = process.env.NODE_ENV === 'development';

  const handleSignInSocial = (provider: Provider) => {
    if (isDevelopment) {
      signIn(provider, {
        callbackUrl: `/${locale}`,
      });
    } else {
      showToast.error(
        t(
          'toast-messages.error.social-auth-is-currently-unavailable-in-production'
        )
      );
    }
  };

  const handleGoogleSignIn = () => handleSignInSocial('google');

  const handleGithubSignIn = () => handleSignInSocial('github');

  return (
    <>
      <div className="flex flex-row space-x-3">
        <AuthSocialButton Icon={GoogleIcon} onClick={handleGoogleSignIn} />
        <AuthSocialButton Icon={GithubIcon} onClick={handleGithubSignIn} />
      </div>
      <div className="flex-center py-1.5">
        <div className="border-t primary-border-light flex-grow" />
        <span className="mx-4 text-gray-500">{t('auth.social.label')}</span>
        <div className="border-t primary-border-light flex-grow" />
      </div>
    </>
  );
};
