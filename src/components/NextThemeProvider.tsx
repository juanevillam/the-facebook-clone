'use client';

import { ThemeProvider } from 'next-themes';

type NextThemeProviderProps = { children: React.ReactNode };

export const NextThemeProvider = ({ children }: NextThemeProviderProps) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    {children}
  </ThemeProvider>
);
