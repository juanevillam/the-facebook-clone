import { useEffect, useState } from 'react';

import { applyThemeToDOM } from '@/utils';

export type Theme = 'system' | 'dark' | 'light';

export const useTheme = (): [Theme, (theme: Theme) => void] => {
  const [theme, setTheme] = useState<Theme>('system');

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyThemeToDOM(newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = storedTheme || 'system';

    setTheme(initialTheme);
    applyThemeToDOM(initialTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (
        !localStorage.getItem('theme') ||
        localStorage.getItem('theme') === 'system'
      )
        document.documentElement.classList.toggle('dark', e.matches);
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  return [theme, changeTheme];
};
