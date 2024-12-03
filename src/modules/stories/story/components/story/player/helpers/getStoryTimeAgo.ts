export const getStoryTimeAgo = (timestamp: string | number | Date): string => {
  const now = Date.now();
  const time = new Date(timestamp).getTime();
  const diff = now - time;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (minutes < 60) return `${minutes}m`;
  else return `${hours}h`;
};
