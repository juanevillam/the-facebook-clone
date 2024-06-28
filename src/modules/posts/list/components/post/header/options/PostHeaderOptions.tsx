'use client';

import classNames from 'classnames';

import { DotsHorizontalIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';

export const PostHeaderOptions = () => {
  return (
    <div className="-mt-2 md:mt-0">
      <IconButton
        className={classNames(
          'size-9 dark:hover:bg-dark-900 md:hover:bg-gray-100'
        )}
        icon={{
          className: 'size-full dark:fill-smoke-200 md:fill-dark-1200',
          Component: DotsHorizontalIcon,
          name: 'dots-horizontal',
        }}
        onClick={() => {}}
      />
    </div>
  );
};
