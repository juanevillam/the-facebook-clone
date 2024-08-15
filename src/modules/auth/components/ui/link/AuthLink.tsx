import Link from 'next/link';

type AuthLinkProps = {
  label: string;
  navigateTo: '/' | 'auth' | 'auth/forgot-password';
};

export const AuthLink = ({ label, navigateTo }: AuthLinkProps) => {
  return (
    <Link
      className="font-semibold text-primary-100 hover:text-primary-200 text-sm hover:underline"
      href={`/${navigateTo}`}
    >
      {label}
    </Link>
  );
};
