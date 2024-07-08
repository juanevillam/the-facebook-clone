export const getRelativeTime = (date: Date, locale: string) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 120) {
    return { type: 'just-now' };
  } else if (minutes < 120) {
    return { type: 'minutes', value: minutes };
  } else if (hours < 48) {
    return { type: 'hours', value: hours };
  } else if (days < 7) {
    return { type: 'days', value: days };
  } else {
    const dateString = new Intl.DateTimeFormat(locale, {
      month: 'long',
      day: 'numeric',
    }).format(date);

    const timeString = new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);

    const fullDateTime = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);

    return {
      type: 'date',
      date: dateString,
      time: timeString,
      fullDateTime,
    };
  }
};
