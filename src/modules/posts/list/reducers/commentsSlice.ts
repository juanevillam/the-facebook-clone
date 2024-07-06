import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CommentsState {
  isOpenableOpen: boolean;
  thoughts: string;
  posting?: boolean;
}

const initialState: CommentsState = {
  isOpenableOpen: false,
  thoughts: '',
  posting: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    toggleOpenable(state) {
      state.isOpenableOpen = !state.isOpenableOpen;
    },
    setThoughts(state, action: PayloadAction<string>) {
      state.thoughts = action.payload;
    },
    togglePosting(state) {
      state.posting = !state.posting;
    },
  },
});

export const { toggleOpenable } = commentsSlice.actions;
export default commentsSlice.reducer;
