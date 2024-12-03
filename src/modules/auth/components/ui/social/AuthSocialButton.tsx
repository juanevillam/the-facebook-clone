import { useTranslations } from 'next-intl';

import { SharedSvg } from '@/assets/types';
import { Button } from '@/components/buttons';

import { AuthProvider } from './AuthSocial';

type AuthSocialButtonProps = {
  Icon: SharedSvg;
  label: AuthProvider;
  onClick: VoidFunction;
};

export const AuthSocialButton = ({
  Icon,
  label,
  onClick,
}: AuthSocialButtonProps) => {
  const t = useTranslations('auth.social.buttons');

  return (
    <Button
      ariaLabel={t(label)}
      fullWidth
      onClick={onClick}
      type="button"
      variant="auth"
    >
      <Icon className="size-[28px]" />
    </Button>
  );
};
