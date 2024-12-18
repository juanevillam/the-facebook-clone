import { useTranslations } from 'next-intl';

import { AuthLink } from './AuthLink';

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
    <div className="bg-card p-4 md:w-5/12 md:rounded-lg md:shadow-lg">
      {info ? (
        <div
          className="flex flex-col items-center text-center"
          aria-describedby="auth-card-description"
          aria-labelledby="auth-card-title"
        >
          {showChildrenOn === 'top' && (
            <div className="mb-2 flex w-full items-center justify-center">
              {children}
            </div>
          )}
          <h1
            className="text-primary mb-1 text-2xl font-semibold"
            id="auth-card-title"
          >
            {info.title}
          </h1>
          <p className="text-secondary mb-4" id="auth-card-description">
            {info.description}
          </p>
          {showChildrenOn === 'bottom' && (
            <div className="mb-6 w-full md:mb-4">{children}</div>
          )}
          <AuthLink label={t('link')} navigateTo="auth" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
