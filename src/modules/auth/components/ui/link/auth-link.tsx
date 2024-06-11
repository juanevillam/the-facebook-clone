import Link from 'next/link';

interface AuthLinkProps {
  label: string;
  navigateTo: string;
}

export const AuthLink = ({ label, navigateTo }: AuthLinkProps) => {
  return (
    <strong>
      <Link
        className="hover:text-primary-200 hover:underline text-primary-100 text-sm"
        href={`/${navigateTo}`}
        tabIndex={0}
      >
        {label}
      </Link>
    </strong>
  );
};
