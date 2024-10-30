import { createSlice } from '@reduxjs/toolkit';

type HeaderOptionsState = {
  deletingPost: boolean;
};

const initialState: HeaderOptionsState = {
  deletingPost: false,
};

const headerOptionsSlice = createSlice({
  name: 'headerOptions',
  initialState,
  reducers: {
    toggleDeletingPost(state) {
      state.deletingPost = !state.deletingPost;
    },
  },
});

export const { toggleDeletingPost } = headerOptionsSlice.actions;

export default headerOptionsSlice.reducer;
