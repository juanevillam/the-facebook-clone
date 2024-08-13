import { createSlice } from '@reduxjs/toolkit';

interface OptionsState {
  deletingPost: boolean;
}

const initialState: OptionsState = {
  deletingPost: false,
};

const optionsSlice = createSlice({
  name: 'headerOptions',
  initialState,
  reducers: {
    toggleDeletingPost(state) {
      state.deletingPost = !state.deletingPost;
    },
  },
});

export const { toggleDeletingPost } = optionsSlice.actions;

export default optionsSlice.reducer;
