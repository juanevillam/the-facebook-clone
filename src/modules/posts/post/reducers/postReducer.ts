import { createSlice } from '@reduxjs/toolkit';

type PostState = {
  deletingComment: boolean;
  deletingPost: boolean;
};

const initialState: PostState = {
  deletingComment: false,
  deletingPost: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    toggleDeletingComment(state) {
      state.deletingComment = !state.deletingComment;
    },
    toggleDeletingPost(state) {
      state.deletingPost = !state.deletingPost;
    },
  },
});

export const { toggleDeletingComment, toggleDeletingPost } = postSlice.actions;

export default postSlice.reducer;
