'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { POSTS_USER_INFO_PATH } from '@/modules/posts/assets/translations';
import { getRelativeTime } from '@/modules/posts/list/utils';

interface PostHeaderUserInfoTimestampProps {
  date: Date;
}

export const PostHeaderUserInfoTimestamp = ({
  date,
}: PostHeaderUserInfoTimestampProps) => {
  const [relativeTime, setRelativeTime] = useState(getRelativeTime(date));
  const t = useTranslations(`${POSTS_USER_INFO_PATH}.timestamp`);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRelativeTime(getRelativeTime(date));
    }, 60000);

    return () => clearInterval(intervalId);
  }, [date]);

  return (
    <span className="tertiary-text text-sm">
      {relativeTime === 'just-now' ? t('just-now') : relativeTime}
    </span>
  );
};
