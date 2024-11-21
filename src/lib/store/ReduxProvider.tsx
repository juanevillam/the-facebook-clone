'use client';

import { Provider } from 'react-redux';

import { useTheme } from '@/hooks';

import { store } from './store';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useTheme();

  return <Provider store={store}>{children}</Provider>;
}
