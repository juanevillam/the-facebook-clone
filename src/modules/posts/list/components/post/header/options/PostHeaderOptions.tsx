'use client';

import classNames from 'classnames';

import { DotsHorizontalIcon } from '@/assets/ui/icons';
import { IconButton } from '@/components/buttons';

export const PostHeaderOptions = () => {
  return (
    <div className="-mt-2 md:mt-0 flex-shrink-0">
      <IconButton
        className={classNames('size-9 hover:main-bg-hover')}
        icon={{
          className: 'secondary-fill size-full',
          Component: DotsHorizontalIcon,
          name: 'dots-horizontal',
        }}
        onClick={() => {}}
      />
    </div>
  );
};
