import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth-reducer';

export const store = configureStore({
  reducer: {
    authReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
