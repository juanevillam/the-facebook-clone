import { createSlice } from '@reduxjs/toolkit';

interface HeaderOptionsState {
  isOpenableOpen: boolean;
  isOpenableToConfirm: boolean;
  deletingPost: boolean;
}

const initialState: HeaderOptionsState = {
  isOpenableOpen: false,
  isOpenableToConfirm: false,
  deletingPost: false,
};

const headerOptionsSlice = createSlice({
  name: 'headerOptions',
  initialState,
  reducers: {
    toggleOpenable(state) {
      state.isOpenableOpen = !state.isOpenableOpen;
    },
    toggleOpenableToConfirm(state) {
      state.isOpenableToConfirm = !state.isOpenableToConfirm;
    },
    toggleDeletingPost(state) {
      state.deletingPost = !state.deletingPost;
    },
  },
});

export const { toggleOpenable, toggleOpenableToConfirm, toggleDeletingPost } =
  headerOptionsSlice.actions;

export default headerOptionsSlice.reducer;
