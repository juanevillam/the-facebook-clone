import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null;

const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
};

export const useBreakpoint = () => {
  const getBreakpoint = () => {
    if (typeof window === 'undefined') return null;

    if (!window.matchMedia(breakpoints.sm).matches) return 'xs';

    if (
      window.matchMedia(breakpoints.sm).matches &&
      !window.matchMedia(breakpoints.md).matches
    )
      return 'sm';

    if (
      window.matchMedia(breakpoints.md).matches &&
      !window.matchMedia(breakpoints.lg).matches
    )
      return 'md';

    if (
      window.matchMedia(breakpoints.lg).matches &&
      !window.matchMedia(breakpoints.xl).matches
    )
      return 'lg';

    return 'xl';
  };

  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>(null);

  useEffect(() => {
    const handleResize = () => {
      const breakpoint = getBreakpoint();

      setCurrentBreakpoint(breakpoint);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return currentBreakpoint;
};
