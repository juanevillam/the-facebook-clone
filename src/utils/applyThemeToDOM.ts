import { Theme } from '@/hooks/useTheme';

export const applyThemeToDOM = (theme: Theme) => {
  if (theme === 'system') {
    const isDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    document.documentElement.classList.toggle('dark', isDarkMode);
  } else document.documentElement.classList.toggle('dark', theme === 'dark');
};
