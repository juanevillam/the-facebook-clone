import { createSlice } from '@reduxjs/toolkit';

interface initialState {
  createPostOpenableOpen: boolean;
}

const initialState: initialState = {
  createPostOpenableOpen: false,
};

export const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleCreatePostOpenable(state) {
      state.createPostOpenableOpen = !state.createPostOpenableOpen;
    },
  },
});

export const { toggleCreatePostOpenable } = posts.actions;
export default posts.reducer;
