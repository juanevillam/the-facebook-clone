import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type stepType = 'default' | 'feelings' | 'media' | 'gif';

type mediaType = {
  file: string | ArrayBuffer | null;
  playing: boolean;
  type: string | null;
};

interface initialState {
  createPostOpenableOpen: boolean;
  step: stepType;
  thoughts: string;
  media: mediaType;
}

const initialState: initialState = {
  createPostOpenableOpen: false,
  step: 'default',
  thoughts: '',
  media: {
    file: '',
    playing: false,
    type: null,
  },
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
    setMedia(state, action: PayloadAction<mediaType>) {
      state.media = action.payload;
    },
  },
});

export const { toggleCreatePostOpenable, setStep, setThoughts, setMedia } =
  posts.actions;
export default posts.reducer;
