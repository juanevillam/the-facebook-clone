import { signIn } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';

import { GithubIcon, GoogleIcon } from '@/assets/icons/social';

import { AuthSocialButton } from './AuthSocialButton';

export type AuthProvider = 'google' | 'github';

export const AuthSocial = () => {
  const locale = useLocale();
  const t = useTranslations('auth.social');

  const handleSignInSocial = (provider: AuthProvider) =>
    signIn(provider, {
      callbackUrl: `/${locale}`,
    });

  const handleGoogleSignIn = () => handleSignInSocial('google');

  const handleGithubSignIn = () => handleSignInSocial('github');

  return (
    <div>
      <h2 className="sr-only" id="auth-social-title">
        {t('title')}
      </h2>
      <div
        aria-labelledby="auth-social-title"
        className="flex flex-row space-x-3 pb-4"
      >
        <AuthSocialButton
          Icon={GoogleIcon}
          label="google"
          onClick={handleGoogleSignIn}
        />
        <AuthSocialButton
          Icon={GithubIcon}
          label="github"
          onClick={handleGithubSignIn}
        />
      </div>
      <div className="flex-center py-1.5">
        <div className="primary-border-light flex-grow border-t" />
        <span className="mx-4 text-gray-500">{t('label')}</span>
        <div className="primary-border-light flex-grow border-t" />
      </div>
    </div>
  );
};
