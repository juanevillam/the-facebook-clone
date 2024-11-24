import { createSlice } from '@reduxjs/toolkit';

type CreateStoryStoryState = {
  posting: boolean;
};

const initialState: CreateStoryStoryState = {
  posting: false,
};

const createStoryStorySlice = createSlice({
  name: 'createStoryStory',
  initialState,
  reducers: {
    toggleCreateStoryPosting(state) {
      state.posting = !state.posting;
    },
  },
});

export const { toggleCreateStoryPosting } = createStoryStorySlice.actions;

export default createStoryStorySlice.reducer;
