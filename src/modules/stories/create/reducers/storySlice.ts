import { createSlice } from '@reduxjs/toolkit';

type StoryState = {
  posting: boolean;
};

const initialState: StoryState = {
  posting: false,
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    togglePosting(state) {
      state.posting = !state.posting;
    },
  },
});

export const { togglePosting } = storySlice.actions;

export default storySlice.reducer;
