import { Backdrop } from '@mui/material';
import { useTranslations } from 'next-intl';
import { MoonLoader } from 'react-spinners';

type ActionLoaderProps = {
  className?: string;
  message: 'deleting-comment' | 'deleting-post' | 'posting';
  open: boolean;
};

export const ActionLoader = ({
  className = '',
  message,
  open,
}: ActionLoaderProps) => {
  const t = useTranslations('action-loader');

  return (
    <Backdrop
      aria-labelledby="action-loader-title"
      className={`z-20 flex-col ${className}`}
      open={open}
      role="dialog"
    >
      <MoonLoader className="mb-2" color="#F3F4F6" size={28} />
      <h1 id="action-loader-title" className="text-primary-dark text-xl">
        {t(message)}
      </h1>
    </Backdrop>
  );
};
