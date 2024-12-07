import { createSlice } from '@reduxjs/toolkit';

type CreateStoryStoryState = {
  isOpenableOpen: boolean;
  posting: boolean;
};

const initialState: CreateStoryStoryState = {
  isOpenableOpen: false,
  posting: false,
};

const createStoryStorySlice = createSlice({
  name: 'createStoryStory',
  initialState,
  reducers: {
    toggleCreateStoryOpenable(state) {
      state.isOpenableOpen = !state.isOpenableOpen;
    },
    toggleCreateStoryPosting(state) {
      state.posting = !state.posting;
    },
  },
});

export const { toggleCreateStoryOpenable, toggleCreateStoryPosting } =
  createStoryStorySlice.actions;

export default createStoryStorySlice.reducer;
