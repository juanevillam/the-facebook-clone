import { signIn } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';

import { GithubIcon, GoogleIcon } from '@/assets/ui/svgs/social';
import { getRedirectPath } from '@/modules/auth/utils';
import { localeType } from '@/modules/auth/utils/getRedirectPath';

import { AuthSocialButton } from './button/auth-social-button';

type providerType = 'google' | 'github';

export const AuthSocial = () => {
  const locale = useLocale();
  const t = useTranslations('auth.social');

  const handleSignInSocial = (provider: providerType) =>
    signIn(provider, {
      callbackUrl: `/${locale}${getRedirectPath(locale as localeType)}`,
    });

  const handleGoogleSignIn = () => handleSignInSocial('google');

  const handleGithubSignIn = () => handleSignInSocial('github');

  return (
    <>
      <div className="flex flex-row space-x-3">
        <AuthSocialButton Icon={GoogleIcon} onClick={handleGoogleSignIn} />
        <AuthSocialButton Icon={GithubIcon} onClick={handleGithubSignIn} />
      </div>
      <div className="flex items-center py-1.5">
        <div className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500">{t('label')}</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>
    </>
  );
};
