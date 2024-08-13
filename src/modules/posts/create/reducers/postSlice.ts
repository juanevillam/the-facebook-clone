import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Step } from '../assets/types';

interface PostState {
  isOpenableOpen: boolean;
  step: Step;
  thoughts: string;
  posting: boolean;
}

const initialState: PostState = {
  isOpenableOpen: false,
  step: 'default',
  thoughts: '',
  posting: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    toggleOpenable(state) {
      state.isOpenableOpen = !state.isOpenableOpen;
    },
    setStep(state, action: PayloadAction<Step>) {
      state.step = action.payload;
    },
    setThoughts(state, action: PayloadAction<string>) {
      state.thoughts = action.payload;
    },
    togglePosting(state) {
      state.posting = !state.posting;
    },
  },
});

export const { toggleOpenable, setStep, setThoughts, togglePosting } =
  postSlice.actions;

export default postSlice.reducer;
