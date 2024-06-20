import { sharedSvgType, voidFunctionType } from '@/assets/types';
import { Button } from '@/components/buttons';

interface AuthSocialButtonProps {
  Icon: sharedSvgType;
  onClick: voidFunctionType;
}

export const AuthSocialButton = ({ Icon, onClick }: AuthSocialButtonProps) => {
  return (
    <Button fullWidth onClick={onClick} type="button" variant="auth">
      <Icon className="size-[28px]" />
    </Button>
  );
};
