import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  signUpOpenableOpen: boolean;
};

const initialState: AuthState = {
  signUpOpenableOpen: false,
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleSignUpOpenable(state) {
      state.signUpOpenableOpen = !state.signUpOpenableOpen;
    },
  },
});

export const { toggleSignUpOpenable } = auth.actions;
export default auth.reducer;
