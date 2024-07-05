'use client';

import { useEffect, useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { Tooltip } from '@/components';
import { POSTS_USER_INFO_PATH } from '@/modules/posts/assets/translations';
import { getRelativeTime } from '@/modules/posts/list/utils';

interface PostHeaderUserInfoTimestampProps {
  date: Date;
}

export const PostHeaderUserInfoTimestamp = ({
  date,
}: PostHeaderUserInfoTimestampProps) => {
  const locale = useLocale();
  const t = useTranslations(`${POSTS_USER_INFO_PATH}.timestamp`);
  const [relativeTime, setRelativeTime] = useState(
    getRelativeTime(date, locale)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRelativeTime(getRelativeTime(date, locale));
    }, 60000);

    return () => clearInterval(intervalId);
  }, [date, locale]);

  const renderTimestamp = () => {
    switch (relativeTime.type) {
      case 'just-now':
        return t('just-now');
      case 'minutes':
        return t('minutes', { minutes: relativeTime.value });
      case 'hours':
        return t('hours', { hours: relativeTime.value });
      case 'days':
        return t('days', { days: relativeTime.value });
      case 'date':
        return t('date', { date: relativeTime.date, time: relativeTime.time });
      default:
        return '';
    }
  };

  const fullDateTime = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);

  return (
    <div className="-mt-1">
      <Tooltip label={fullDateTime} position="-bottom-9">
        <span className="tertiary-text peer cursor-pointer text-xs hover:underline">
          {renderTimestamp()}
        </span>
      </Tooltip>
    </div>
  );
};
