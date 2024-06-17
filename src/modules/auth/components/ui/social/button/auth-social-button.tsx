import { SharedSvgProps } from '@/assets/ui/icons/types';
import { Button } from '@/components/buttons';

interface AuthSocialButtonProps {
  Icon: React.FC<SharedSvgProps>;
  onClick: () => void;
}

export const AuthSocialButton = ({ Icon, onClick }: AuthSocialButtonProps) => {
  return (
    <Button fullWidth onClick={onClick} type="button" variant="auth">
      <Icon className="size-[28px]" />
    </Button>
  );
};
