import { useTranslations } from 'next-intl';

import { AuthLink } from '..';

type AuthCardProps = {
  info?: {
    title: string;
    description: string;
  };
  showChildrenOn?: 'top' | 'bottom';
  children: React.ReactNode;
};

export const AuthCard = ({ info, showChildrenOn, children }: AuthCardProps) => {
  const t = useTranslations('auth.card');

  return (
    <div className="p-4 md:bg-white md:rounded-lg md:shadow-lg md:w-5/12">
      {info ? (
        <div className="flex-center-justify-center flex-col text-center">
          {showChildrenOn === 'top' && (
            <div className="flex-center-justify-center mb-2 w-full">
              {children}
            </div>
          )}
          <h1 className="font-semibold mb-1 text-2xl">{info?.title}</h1>
          <p className="mb-4">{info?.description}</p>
          {showChildrenOn === 'bottom' && (
            <div className="mb-6 md:mb-4 w-full">{children}</div>
          )}
          {/* 
            // TODO: When user is logged in, navigate to home ("/") page, otherwise navigate to auth page and the label show be go back to home ("/") and go back to log in
            <Link label={t("link")} navigateTo={session ? "/" : "auth"} />
          */}
          <AuthLink label={t('link')} navigateTo="auth" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
