'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { POSTS_CREATE_LAYOUT_HEADER_PATH } from '@/modules/posts/create/assets/translations';
import { getRelativeTime } from '@/modules/posts/list/lib/utils';

interface PostHeaderUserInfoTimestampProps {
  date: Date;
}

export const PostHeaderUserInfoTimestamp = ({
  date,
}: PostHeaderUserInfoTimestampProps) => {
  const [relativeTime, setRelativeTime] = useState(getRelativeTime(date));
  const t = useTranslations(
    `${POSTS_CREATE_LAYOUT_HEADER_PATH}.user-info.timestamp`
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRelativeTime(getRelativeTime(date));
    }, 60000);

    return () => clearInterval(intervalId);
  }, [date]);

  return (
    <span className="text-gray-600 text-sm dark:text-smoke-200  md:text-gray-500">
      {relativeTime === 'just-now' ? t('just-now') : relativeTime}
    </span>
  );
};
