'use client';

import { useTranslations } from 'next-intl';

import { PlusIcon } from '@/assets/ui/icons';
import { Link } from '@/navigation';

export const CreateStoryCard = () => {
  const t = useTranslations('stories.create.card');

  return (
    <div className="card md:p-2.5">
      <Link
        className="flex-center primary-transition hover:primary-bg space-x-2.5 p-3 md:space-x-3 md:rounded-lg md:px-2 md:py-1.5"
        href="/stories/create"
      >
        <PlusIcon className="primary-transition size-12 rounded-full bg-primary-500 fill-primary-100 stroke-primary-100 stroke-1 p-3 dark:bg-primary-300" />
        <div className="-mt-0.5">
          <h1 className="primary-text primary-transition text-lg font-semibold">
            {t('title')}
          </h1>
          <p className="tertiary-text primary-transition -mt-0.5">
            {t('subtitle')}
          </p>
        </div>
      </Link>
    </div>
  );
};
