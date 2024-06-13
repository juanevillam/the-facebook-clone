import Link from 'next/link';

interface AuthLinkProps {
  label: string;
  navigateTo: string;
}

export const AuthLink = ({ label, navigateTo }: AuthLinkProps) => {
  return (
    <Link
      className="font-semibold hover:text-primary-200 hover:underline text-primary-100 text-sm"
      href={`/${navigateTo}`}
    >
      {label}
    </Link>
  );
};
