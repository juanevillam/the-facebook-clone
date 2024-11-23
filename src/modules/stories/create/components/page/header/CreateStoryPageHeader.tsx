'use client';

import { useTranslations } from 'next-intl';

import { ArrowLeftIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';
import { useRouter } from '@/navigation';

export const CreateStoryPageHeader = () => {
  const t = useTranslations('stories.create.page.header');
  const router = useRouter();

  const navigateToHome = () => router.push('/');

  return (
    <div className="only-mobile flex-center primary-border space-x-1.5 border-b p-1.5">
      <IconButton
        className="hover:primary-bg size-10"
        icon={{
          className: 'stroke-[2.5] primary-stroke size-full',
          Component: ArrowLeftIcon,
          name: 'back',
        }}
        onClick={navigateToHome}
      />
      <h1 className="primary-text text-lg font-semibold">{t('title')}</h1>
    </div>
  );
};
