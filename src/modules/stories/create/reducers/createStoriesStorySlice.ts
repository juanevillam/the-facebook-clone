import { createSlice } from '@reduxjs/toolkit';

type CreateStoriesStoryState = {
  posting: boolean;
};

const initialState: CreateStoriesStoryState = {
  posting: false,
};

const createStoriesStorySlice = createSlice({
  name: 'createStoriesStory',
  initialState,
  reducers: {
    toggleCreateStoryPosting(state) {
      state.posting = !state.posting;
    },
  },
});

export const { toggleCreateStoryPosting } = createStoriesStorySlice.actions;

export default createStoriesStorySlice.reducer;
