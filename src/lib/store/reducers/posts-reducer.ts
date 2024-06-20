import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type stepType = 'default' | 'feelings' | 'media' | 'gif';

interface initialState {
  createPostOpenableOpen: boolean;
  step: stepType;
}

const initialState: initialState = {
  createPostOpenableOpen: false,
  step: 'default',
};

export const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleCreatePostOpenable(state) {
      state.createPostOpenableOpen = !state.createPostOpenableOpen;
    },
    setStep(state, action: PayloadAction<stepType>) {
      state.step = action.payload;
    },
  },
});

export const { toggleCreatePostOpenable, setStep } = posts.actions;
export default posts.reducer;
