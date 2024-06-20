import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type stepType = 'default' | 'feelings' | 'media' | 'gif';

interface initialState {
  createPostOpenableOpen: boolean;
  step: stepType;
  thoughts: string;
}

const initialState: initialState = {
  createPostOpenableOpen: false,
  step: 'default',
  thoughts: '',
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
    setThoughts(state, action: PayloadAction<string>) {
      state.thoughts = action.payload;
    },
  },
});

export const { toggleCreatePostOpenable, setStep, setThoughts } = posts.actions;
export default posts.reducer;
