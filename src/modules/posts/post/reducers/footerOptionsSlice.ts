import { createSlice } from '@reduxjs/toolkit';

type FooterOptionsState = {
  deletingComment: boolean;
};

const initialState: FooterOptionsState = {
  deletingComment: false,
};

const footerOptionsSlice = createSlice({
  name: 'footerOptions',
  initialState,
  reducers: {
    toggleDeletingComment(state) {
      state.deletingComment = !state.deletingComment;
    },
  },
});

export const { toggleDeletingComment } = footerOptionsSlice.actions;

export default footerOptionsSlice.reducer;
