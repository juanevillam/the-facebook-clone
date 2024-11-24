import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Step } from '../assets/types';

type CreatePostPostState = {
  isOpenableOpen: boolean;
  step: Step;
  thoughts: string;
  posting: boolean;
};

const initialState: CreatePostPostState = {
  isOpenableOpen: false,
  step: 'default',
  thoughts: '',
  posting: false,
};

const createPostPostSlice = createSlice({
  name: 'createPostPost',
  initialState,
  reducers: {
    toggleCreatePostOpenable(state) {
      state.isOpenableOpen = !state.isOpenableOpen;
    },
    setCreatePostStep(state, action: PayloadAction<Step>) {
      state.step = action.payload;
    },
    setCreatePostThoughts(state, action: PayloadAction<string>) {
      state.thoughts = action.payload;
    },
    toggleCreatePostPosting(state) {
      state.posting = !state.posting;
    },
  },
});

export const {
  toggleCreatePostOpenable,
  setCreatePostStep,
  setCreatePostThoughts,
  toggleCreatePostPosting,
} = createPostPostSlice.actions;

export default createPostPostSlice.reducer;
