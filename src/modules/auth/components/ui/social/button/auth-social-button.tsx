import { SharedSvgProps } from '@/assets/ui/svgs/types';
import { Button } from '@/components/ui';

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
