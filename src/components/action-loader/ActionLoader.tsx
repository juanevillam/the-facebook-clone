import { Backdrop } from '@mui/material';
import { useTranslations } from 'next-intl';
import { MoonLoader } from 'react-spinners';

type ActionLoaderProps = {
  className?: string;
  message: 'deleting-post' | 'posting';
  open: boolean;
};

export const ActionLoader = ({
  className,
  message,
  open,
}: ActionLoaderProps) => {
  const t = useTranslations('action-loader');

  return (
    <Backdrop className={`flex-col z-20 ${className}`} open={open}>
      <MoonLoader className="mb-2" color="#F3F4F6" size={28} />
      <h1 className="primary-text-dark text-xl">{t(message)}</h1>
    </Backdrop>
  );
};
