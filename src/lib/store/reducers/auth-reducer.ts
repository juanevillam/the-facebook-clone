import { createSlice } from '@reduxjs/toolkit';

interface initialState {
  signUpOpenableOpen: boolean;
}

const initialState: initialState = {
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
