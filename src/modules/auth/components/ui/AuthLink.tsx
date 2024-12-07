import { Link } from '@/navigation';

type AuthLinkProps = {
  label: string;
  navigateTo: '/' | 'auth' | 'auth/forgot-password';
};

export const AuthLink = ({ label, navigateTo }: AuthLinkProps) => (
  <Link
    aria-label={label}
    className="text-sm font-semibold text-primary-100 hover:text-primary-200 hover:underline"
    href={`/${navigateTo}` as any}
  >
    {label}
  </Link>
);
