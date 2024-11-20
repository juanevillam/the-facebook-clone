'use client';

import { Provider } from 'react-redux';

import { store } from './store';
import { useTheme } from '@/hooks';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useTheme();

  return <Provider store={store}>{children}</Provider>;
}
