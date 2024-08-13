import { SharedSvg, VoidFunction } from '@/assets/types';
import { Button } from '@/components/buttons';

interface AuthSocialButtonProps {
  Icon: SharedSvg;
  onClick: VoidFunction;
}

export const AuthSocialButton = ({ Icon, onClick }: AuthSocialButtonProps) => {
  return (
    <Button fullWidth onClick={onClick} type="button" variant="auth">
      <Icon className="size-[28px]" />
    </Button>
  );
};
